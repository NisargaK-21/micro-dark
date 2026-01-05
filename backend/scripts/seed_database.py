"""
Database Seeding Script
Populates database with sample data
"""

import sys
import os
from datetime import datetime, timedelta

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.postgres import get_session, init_db
from app.models.vendor import Vendor
from app.models.campaign import Campaign
from app.models.tactic import Tactic
from app.models.post import Post

def seed_database():
    """Seed database with sample data"""
    print("🌱 Seeding database...")
    
    # Initialize database
    init_db()
    
    db = get_session()
    
    try:
        # Clear existing data (optional - comment out to keep existing data)
        db.query(Post).delete()
        db.query(Campaign).delete()
        db.query(Vendor).delete()
        db.query(Tactic).delete()
        db.commit()
        print("✅ Cleared existing data")
    except Exception as e:
        print(f"⚠️  Could not clear existing data: {e}")
        db.rollback()
    
    # Seed Tactics
    tactics_data = [
        {"id": "t001", "name": "Urgency", "description": "Creating time pressure", "usage_count": 245},
        {"id": "t002", "name": "Trust Building", "description": "Establishing credibility", "usage_count": 198},
        {"id": "t003", "name": "Social Proof", "description": "Using testimonials and reviews", "usage_count": 187},
        {"id": "t004", "name": "Limited Supply", "description": "Scarcity tactics", "usage_count": 156},
        {"id": "t005", "name": "FOMO", "description": "Fear of missing out", "usage_count": 142},
        {"id": "t006", "name": "Repetition", "description": "Repeated messaging", "usage_count": 128},
        {"id": "t007", "name": "Exclusivity", "description": "VIP or exclusive access", "usage_count": 115},
        {"id": "t008", "name": "Testimonials", "description": "Customer reviews and feedback", "usage_count": 98},
    ]
    
    for tactic_data in tactics_data:
        tactic = Tactic(**tactic_data)
        db.add(tactic)
    
    print(f"✅ Seeded {len(tactics_data)} tactics")
    
    # Seed Vendors
    vendors_data = [
        {
            "id": "v001",
            "name": "ShadowMarket_Pro",
            "activity": 89,
            "campaigns": 12,
            "tactics": ["Urgency", "Social Proof", "Limited Supply"],
            "risk_level": "Critical",
            "last_seen": datetime.utcnow() - timedelta(hours=2)
        },
        {
            "id": "v002",
            "name": "DarkDealer_X",
            "activity": 76,
            "campaigns": 8,
            "tactics": ["Trust Building", "Repetition", "Exclusivity"],
            "risk_level": "High",
            "last_seen": datetime.utcnow() - timedelta(hours=1)
        },
        {
            "id": "v003",
            "name": "UndergroundSupply",
            "activity": 65,
            "campaigns": 15,
            "tactics": ["Urgency", "FOMO", "Testimonials"],
            "risk_level": "High",
            "last_seen": datetime.utcnow() - timedelta(hours=3)
        },
        {
            "id": "v004",
            "name": "HiddenVendor_99",
            "activity": 54,
            "campaigns": 6,
            "tactics": ["Trust Building", "Limited Supply"],
            "risk_level": "Medium",
            "last_seen": datetime.utcnow() - timedelta(hours=12)
        },
        {
            "id": "v005",
            "name": "CryptoMarket_Alpha",
            "activity": 43,
            "campaigns": 9,
            "tactics": ["Social Proof", "Urgency", "Exclusivity"],
            "risk_level": "Medium",
            "last_seen": datetime.utcnow() - timedelta(hours=14)
        },
    ]
    
    for vendor_data in vendors_data:
        vendor = Vendor(**vendor_data)
        db.add(vendor)
    
    print(f"✅ Seeded {len(vendors_data)} vendors")
    
    # Seed Campaigns
    campaigns_data = [
        {
            "id": "c001",
            "name": "Campaign Alpha",
            "risk_level": "Critical",
            "vendor_ids": ["v001", "v002"],
            "forum_ids": ["f001"],
            "tactic_ids": ["t001", "t002"],
            "start_date": datetime.utcnow() - timedelta(days=7)
        },
        {
            "id": "c002",
            "name": "Campaign Beta",
            "risk_level": "High",
            "vendor_ids": ["v003", "v001"],
            "forum_ids": ["f001", "f002"],
            "tactic_ids": ["t001", "t003"],
            "start_date": datetime.utcnow() - timedelta(days=5)
        },
        {
            "id": "c003",
            "name": "Campaign Gamma",
            "risk_level": "Medium",
            "vendor_ids": ["v004"],
            "forum_ids": ["f002"],
            "tactic_ids": ["t002"],
            "start_date": datetime.utcnow() - timedelta(days=3)
        },
    ]
    
    for campaign_data in campaigns_data:
        campaign = Campaign(**campaign_data)
        db.add(campaign)
    
    print(f"✅ Seeded {len(campaigns_data)} campaigns")

    # Seed Posts from CSV dataset
    try:
        import pandas as pd
        df = pd.read_csv(os.path.join(os.path.dirname(__file__), '..', 'ml', 'data', 'posts.csv'))
        posts_added = 0
        for idx, row in df.iterrows():
            post = Post(
                id=f"p{idx+1:05d}",
                content=row.get('text', ''),
                is_marketing=bool(row.get('label', 0)),
                posted_at=datetime.utcnow()
            )
            db.add(post)
            posts_added += 1
        print(f"✅ Seeded {posts_added} posts from CSV dataset")
    except Exception as e:
        print(f"⚠️  Could not seed posts from CSV: {e}")

    # Commit all changes
    db.commit()
    db.close()
    
    print("✅ Database seeding completed successfully!")

if __name__ == "__main__":
    seed_database()

