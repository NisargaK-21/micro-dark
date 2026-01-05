"""Campaigns API routes"""
from fastapi import APIRouter, HTTPException, Path
from app.services.data_service import DataService

router = APIRouter()

@router.get("/campaigns")
async def get_campaigns():
    """Get campaign network graph data"""
    try:
        return DataService.get_campaign_graph()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/campaigns/{campaign_id}")
async def get_campaign_details(campaign_id: str = Path(..., description="Campaign ID")):
    """Get detailed campaign information"""
    try:
        campaign = DataService.get_campaign_details(campaign_id)
        if not campaign:
            raise HTTPException(status_code=404, detail="Campaign not found")
        return campaign
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

