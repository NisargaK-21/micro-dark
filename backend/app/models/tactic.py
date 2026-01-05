"""Tactic model"""
from sqlalchemy import Column, String, Integer, Text, DateTime
from app.database.postgres import Base
from datetime import datetime

class Tactic(Base):
    __tablename__ = "tactics"
    
    id = Column(String(50), primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    usage_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "usageCount": self.usage_count
        }

