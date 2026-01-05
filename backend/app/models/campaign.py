"""Campaign model"""
from sqlalchemy import Column, String, Integer, DateTime, Text, JSON
from app.database.postgres import Base
from datetime import datetime

class Campaign(Base):
    __tablename__ = "campaigns"
    
    id = Column(String(50), primary_key=True)
    name = Column(String(255), nullable=False)
    risk_level = Column(String(20), default="Medium")
    vendor_ids = Column(JSON, default=list)
    forum_ids = Column(JSON, default=list)
    tactic_ids = Column(JSON, default=list)
    start_date = Column(DateTime, default=datetime.utcnow)
    end_date = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "riskLevel": self.risk_level,
            "vendorIds": self.vendor_ids or [],
            "forumIds": self.forum_ids or [],
            "tacticIds": self.tactic_ids or [],
            "startDate": self.start_date.isoformat() if self.start_date else None,
            "endDate": self.end_date.isoformat() if self.end_date else None
        }

