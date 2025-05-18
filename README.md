# 🚨 Crime Sense: Video-Based Crime Classification using Contrast-Enhanced Residual–BiLSTM

**Crime Sense** is a real-time deep learning pipeline that classifies crime events in surveillance video using a combination of contrast-enhanced preprocessing, lightweight residual CNNs, bidirectional LSTM temporal modeling, and structured regularization — all packed into a 1.2M parameter model that runs efficiently on a single GPU.

---

## 🔍 Key Features

- 🎞️ **CLAHE Contrast Enhancement**  
  Boosts low-light frames using localized histogram equalization without over-amplifying noise.

- 🧠 **Residual CNN Encoder**  
  Compact yet deep 2D CNN with skip-connections for better spatial learning and gradient flow.

- ⏪⏩ **Bidirectional LSTM**  
  Captures both "lead-in" motions and "follow-through" reactions over 16-frame clips.

- 🧩 **SpatialDropout1D Regularization**  
  Improves generalization by simulating real-world occlusions (e.g., glare, partial blockages).

- 🧪 **Dual Tasks**  
  - **Binary:** Normal vs Crime (94.0% accuracy)  
  - **Four-Way:** Violent, Property Theft, Destructive, Legal/Accidental (95.6% accuracy)

- ⚡ **Web API & Real-Time Inference**  
  Upload an MP4 clip and receive crime predictions within 1 second!

---

## 📁 Repository Structure

```
Crime-Sense/
├── Code Files/
├── Crime Sense Application/                   
├── Reference Papers/
├── Related Pictures/
├── Reports/              
└── README.md               
```

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/Vignesh-2109/CrimeSense.gitse.git
cd crime-frontnend
cd backend

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # or use `venv\Scripts\activate` on Windows

# 3. Install requirements
pip install -r requirements.txt
```

---

## 📦 Dataset Preparation

Download the dataset from 
```
https://www.kaggle.com/datasets/minhajuddinmeraj/anomalydetectiondatasetucf
```
and categorise them as binary or four way classification as per project.
---

## 🏋️ Model Training

```bash
# Train binary classifier
python Code Files/Binary Classification.ipynb --task binary

# Train four-way classifier
python Code Files/Four Way Classification.ipynb --task four_way
```

After training, save the model with best weights and store in backend/models and load them as needed in app.py to send the input to the model.

---

## 🌐 Run the Web App

Frontend:
```bash
npm run dev
```
Backend:
```bash
python app.py
```

Then open your browser at [http://localhost:8000](http://localhost:3000) and upload an MP4 file to get predictions.

---

## 🧪 API Usage

**Binary Classification:**

```bash
curl -X POST "http://localhost:8000/predict/binary" \
     -F "file=@example_clip.mp4"
```

**Four-Way Classification:**

```bash
curl -X POST "http://localhost:8000/predict/fourway" \
     -F "file=@example_clip.mp4"
```

---

## 📊 Results Summary

| Task                       | Accuracy | Precision | Recall | F₁ Score |
|----------------------------|----------|-----------|--------|----------|
| Binary (Normal vs Crime)   | 94.0%    | 0.94      | 0.94   | 0.94     |
| Four-Way Crime Classification | 95.6%    | 0.96      | 0.96   | 0.96     |

*Detailed loss curves and confusion matrices are available in the `Reports/` folder.*

---

## 📦 Deployment Options

- 🐳 Docker-ready containerization
- 🔄 TensorFlow Serving compatible
- 🧠 Ready for quantization/pruning for edge inference

---

## 📄 Citation

If you use **Crime Sense** in your work, please cite:

```bibtex
@misc{crimesense2024,
  title={Crime Sense: Video-Based Crime Classification using Contrast-Enhanced Residual--BiLSTM},
  author={Vignesh Maram},
  year={2024},
  note={\url{https://github.com/Vignesh-2109/CrimeSense.git}},
}
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 🤝 Contributing

We welcome contributions, suggestions, and bug reports! Feel free to open an issue or submit a pull request.

> Built with 🔍 vision, ⚙️ precision, and 🚓 purpose — for a safer, smarter world.
