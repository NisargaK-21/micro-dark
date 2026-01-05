"""Vendors API routes"""
from fastapi import APIRouter, Query, HTTPException, Path
from typing import Optional
from app.services.data_service import DataService

router = APIRouter()

@router.get("/vendors")
async def get_vendors(
    risk_level: Optional[str] = Query(None, description="Filter by risk level"),
    limit: int = Query(50, ge=1, le=100),
    offset: int = Query(0, ge=0)
):
    """Get list of vendors"""
    try:
        vendors = DataService.get_vendors(risk_level, limit, offset)
        return vendors
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/vendors/{vendor_id}")
async def get_vendor_details(vendor_id: str = Path(..., description="Vendor ID")):
    """Get detailed vendor information"""
    try:
        vendor = DataService.get_vendor_details(vendor_id)
        if not vendor:
            raise HTTPException(status_code=404, detail="Vendor not found")
        return vendor
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

