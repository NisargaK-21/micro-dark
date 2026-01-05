"""Post model"""
from sqlalchemy import Column, String, Text, Boolean, DateTime, JSON
from app.database.postgres import Base
from datetime import datetime

class Post(Base):
    __tablename__ = "posts"
    
    id = Column(String(50), primary_key=True)
    forum_id = Column(String(50))
    vendor_id = Column(String(50))
    campaign_id = Column(String(50))
    content = Column(Text)
    is_marketing = Column(Boolean, default=False)
    detected_tactics = Column(JSON, default=list)
    posted_at = Column(DateTime)
    crawled_at = Column(DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            "id": self.id,
            "forumId": self.forum_id,
            "vendorId": self.vendor_id,
            "campaignId": self.campaign_id,
            "content": self.content,
            "isMarketing": self.is_marketing,
            "detectedTactics": self.detected_tactics or [],
            "postedAt": self.posted_at.isoformat() if self.posted_at else None,
            "crawledAt": self.crawled_at.isoformat() if self.crawled_at else None
        }

