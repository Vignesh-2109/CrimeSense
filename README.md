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
├── data/                   # Dataset splits & preprocessing
├── notebooks/              # EDA and ablation studies
├── models/
│   ├── binary_classifier.keras
│   └── 4_type_classifier.keras
├── src/
│   ├── preprocessing.py    # CLAHE, resizing, extraction
│   ├── architecture.py     # CNN, LSTM, dropout logic
│   ├── train.py            # Training pipeline
│   └── app.py              # Flask inference API
├── results/                # Metrics, confusion matrices, plots
├── Dockerfile              # Container config
└── README.md               # This file
```

---

## ⚙️ Installation & Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/crime-sense.git
cd crime-sense

# 2. Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # or use `venv\Scripts\activate` on Windows

# 3. Install requirements
pip install -r requirements.txt
```

---

## 📦 Dataset Preparation

Place the UCF-Crime dataset videos into `data/raw/`, then run:

```bash
python src/preprocessing.py --input_dir data/raw --output_dir data/processed
```

---

## 🏋️ Model Training

```bash
# Train binary classifier
python src/train.py --task binary

# Train four-way classifier
python src/train.py --task four_way
```

---

## 🌐 Run the Web App

```bash
uvicorn src.app:app --reload --host 0.0.0.0 --port 8000
```

Then open your browser at [http://localhost:8000](http://localhost:8000) and upload an MP4 file to get predictions.

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

*Detailed loss curves and confusion matrices are available in the `results/` folder.*

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
  author={Your Name},
  year={2024},
  note={\url{https://github.com/yourusername/crime-sense}},
}
```

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 🤝 Contributing

We welcome contributions, suggestions, and bug reports! Feel free to open an issue or submit a pull request.

> Built with 🔍 vision, ⚙️ precision, and 🚓 purpose — for a safer, smarter world.
