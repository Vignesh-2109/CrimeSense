# app.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import shutil, tempfile, os, base64, cv2
import numpy as np
import tensorflow as tf

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

binary_model = tf.keras.models.load_model("backend/models/binary_classifier.keras")
fourway_model = tf.keras.models.load_model("backend/models/4_type_classifier.keras")

GROUP_MAP = {
    'Abuse':         'Violent_Crimes',
    'Assault':       'Violent_Crimes',
    'Fighting':      'Violent_Crimes',
    'Shooting':      'Violent_Crimes',
    'Robbery':       'Property_Theft',
    'Burglary':      'Property_Theft',
    'Shoplifting':   'Property_Theft',
    'Stealing':      'Property_Theft',
    'Arson':         'Destructive_Crimes',
    'Explosion':     'Destructive_Crimes',
    'Vandalism':     'Destructive_Crimes',
    'Arrest':        'Legal_Accidents',
    'RoadAccidents': 'Legal_Accidents'
}
def save_upload_to_temp(upload: UploadFile) -> (str, bytes):
    ext = upload.filename.rsplit(".", 1)[-1].lower()
    if ext not in ("mp4", "avi", "mov", "jpg", "jpeg", "png"):
        raise HTTPException(400, "Unsupported file type")

    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=f".{ext}")
    try:
        shutil.copyfileobj(upload.file, tmp)
        tmp.flush()
        with open(tmp.name, "rb") as f:
            data = f.read()
    finally:
        tmp.close()

    return tmp.name, data
def to_base64(path: str, ext: str) -> str:
    with open(path, "rb") as f:
        raw = f.read()
    return base64.b64encode(raw).decode()
def video_to_tensor(path: str, clip_len=16, h=64, w=64):
    cap = cv2.VideoCapture(path)
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    # sample 16 frames evenly
    frames = []
    for fidx in np.linspace(0, total - 1, clip_len, dtype=int):
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(fidx))
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.resize(frame, (w, h))
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) / 255.0
        # TODO: apply CLAHE here if you like
        frames.append(frame)
    cap.release()

    if len(frames) < clip_len:
        pad = clip_len - len(frames)
        frames += [np.zeros_like(frames[0])] * pad

    return np.expand_dims(np.stack(frames), axis=0).astype(np.float32)

@app.post("/predict/binary")
async def predict_binary(file: UploadFile = File(...)):
    tmp_path, _ = save_upload_to_temp(file)
    try:
        clip = video_to_tensor(tmp_path)

        probs = binary_model.predict(clip)[0]  
        pred = np.argmax(probs)                
        label = "Crime" if pred == 1 else "Normal"
        score = float(probs[pred])

        
        b64 = to_base64(tmp_path, file.filename.rsplit(".",1)[-1])
        return {"prediction": label, "score": score, "video": b64}
    finally:
        os.remove(tmp_path)

@app.post("/predict/fourway")
async def predict_fourway(file: UploadFile = File(...)):
    tmp_path, _ = save_upload_to_temp(file)
    try:
        clip = video_to_tensor(tmp_path)
        probs = fourway_model.predict(clip)[0]  
        idx = np.argmax(probs)
        classes = ["Violent_Crimes", "Property_Theft", "Destructive_Crimes", "Legal_Accidents"]
        fine_label = classes[idx]
        score = float(probs[idx])

        b64 = to_base64(tmp_path, file.filename.rsplit(".",1)[-1])
        return {"prediction": fine_label, "score": score, "video": b64}
    finally:
        os.remove(tmp_path)

