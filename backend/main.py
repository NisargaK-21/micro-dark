"""
DarkTrace Backend API
FastAPI application for dark web marketing detection platform
"""

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from datetime import datetime
import os
from dotenv import load_dotenv
from app.api.routes import ml


from app.api.routes import dashboard, vendors, campaigns
from app.database.postgres import init_db

load_dotenv()

app = FastAPI(
    title="DarkTrace API",
    description="API for dark web marketing detection and analysis",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        os.getenv("FRONTEND_URL", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(dashboard.router, prefix="/api", tags=["dashboard"])
app.include_router(vendors.router, prefix="/api", tags=["vendors"])
app.include_router(campaigns.router, prefix="/api", tags=["campaigns"])
app.include_router(ml.router, prefix="/api", tags=["ml"])


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    try:
        init_db()
        print("✅ Database initialized successfully")
    except Exception as e:
        print(f"⚠️  Database initialization warning: {e}")
        print("   Continuing with in-memory data...")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "DarkTrace API",
        "status": "running",
        "version": "1.0.0",
        "endpoints": {
            "overview": "/api/overview",
            "dashboard": "/api/dashboard/stats",
            "vendors": "/api/vendors",
            "campaigns": "/api/campaigns"
        }
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

