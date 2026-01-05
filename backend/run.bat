@echo off
REM DarkTrace Backend Startup Script (Windows)

echo 🚀 Starting DarkTrace Backend...

REM Check if virtual environment exists
if not exist "venv" (
    echo 📦 Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo 🔌 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies if needed
if not exist "venv\.installed" (
    echo 📥 Installing dependencies...
    pip install -r requirements.txt
    type nul > venv\.installed
)

REM Check if .env exists
if not exist ".env" (
    echo ⚙️  Creating .env file...
    copy .env.example .env
)

REM Initialize database (optional)
if "%1"=="--seed" (
    echo 🌱 Seeding database...
    python scripts\seed_database.py
)

REM Start server
echo ✅ Starting FastAPI server on http://localhost:8000
echo 📚 API docs available at http://localhost:8000/docs
uvicorn main:app --reload --port 8000

