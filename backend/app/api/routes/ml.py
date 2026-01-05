from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from ml.inference import predict_marketing
from ml.train_model import train_model
import threading

router = APIRouter()

class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    is_marketing: bool
    confidence: float

@router.post("/analyze", response_model=AnalyzeResponse)
def analyze_text(request: AnalyzeRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    try:
        return predict_marketing(request.text)
    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))


@router.post("/train")
def train_model_endpoint(include_db: bool = True):
    """Trigger retraining of the ML model in background. Returns 202 accepted."""
    def _bg_train():
        try:
            train_model(include_db=include_db)
        except Exception as e:
            # In a real app we would log this
            print(f"Training failed: {e}")

    thread = threading.Thread(target=_bg_train, daemon=True)
    thread.start()
    return {"status": "training_started"}
