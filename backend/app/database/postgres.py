"""PostgreSQL database setup"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

# Database URL - defaults to SQLite for easy setup
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./darktrace.db"  # SQLite for easy demo setup
)

# Create engine
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}  # SQLite specific
    )
else:
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Shared Base for all models
Base = declarative_base()

def get_db() -> Session:
    """Get database session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database tables"""
    from app.models.vendor import Vendor
    from app.models.campaign import Campaign
    from app.models.post import Post
    from app.models.tactic import Tactic
    
    # Create all tables
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")

def get_session():
    """Get database session for direct use"""
    return SessionLocal()

