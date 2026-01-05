#!/bin/bash
# DarkTrace Backend Startup Script

echo "🚀 Starting DarkTrace Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔌 Activating virtual environment..."
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/.installed" ]; then
    echo "📥 Installing dependencies..."
    pip install -r requirements.txt
    touch venv/.installed
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
fi

# Initialize database (optional)
if [ "$1" == "--seed" ]; then
    echo "🌱 Seeding database..."
    python scripts/seed_database.py
fi

# Start server
echo "✅ Starting FastAPI server on http://localhost:8000"
echo "📚 API docs available at http://localhost:8000/docs"
uvicorn main:app --reload --port 8000

