import joblib
from pathlib import Path

MODEL_PATH = Path(__file__).parent / "model" / "marketing_detector.pkl"

# Lazy-load model to avoid startup failure
model = None


def load_model():
    global model
    if model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
        model = joblib.load(MODEL_PATH)
    return model


def predict_marketing(text: str):
    try:
        m = load_model()
    except Exception as e:
        raise RuntimeError(f"Model not available: {e}")

    prediction = m.predict([text])[0]
    probability = m.predict_proba([text])[0].max()

    return {
        "is_marketing": bool(prediction),
        "confidence": round(float(probability), 3)
    }
