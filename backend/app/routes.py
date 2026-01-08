from fastapi import APIRouter
from app.ml.azure_ai import analyze_marketing_content

router = APIRouter()

@router.post("/azure-analyze")
def azure_analyze(payload: dict):
    text = payload.get("text", "")
    return analyze_marketing_content(text)
