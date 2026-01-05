"""Vendor model"""
from sqlalchemy import Column, String, Integer, DateTime, JSON, Text
from app.database.postgres import Base
from datetime import datetime

class Vendor(Base):
    __tablename__ = "vendors"
    
    id = Column(String(50), primary_key=True)
    name = Column(String(255), nullable=False)
    activity = Column(Integer, default=0)
    campaigns = Column(Integer, default=0)
    tactics = Column(JSON, default=list)
    risk_level = Column(String(20), default="Medium")
    last_seen = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "activity": self.activity,
            "campaigns": self.campaigns,
            "tactics": self.tactics or [],
            "riskLevel": self.risk_level,
            "lastSeen": self.last_seen.isoformat() if self.last_seen else None
        }

