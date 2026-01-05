"""Dashboard API routes"""
from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from datetime import datetime, timedelta
from app.services.data_service import DataService

router = APIRouter()

@router.get("/overview")
async def get_overview():
    """Get overview statistics"""
    try:
        return DataService.get_overview_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    try:
        return DataService.get_overview_stats()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/trends")
async def get_dashboard_trends(days: int = Query(7, ge=1, le=30)):
    """Get campaign trends data for charts"""
    try:
        return DataService.get_campaign_trends(days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/tactics")
async def get_tactic_distribution():
    """Get tactic distribution data"""
    try:
        return DataService.get_tactic_distribution()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/dashboard/activity")
async def get_recent_activity(limit: int = Query(10, ge=1, le=100)):
    """Get recent activity feed"""
    try:
        return DataService.get_recent_activity(limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

