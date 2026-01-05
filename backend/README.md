# DarkTrace Backend API

FastAPI backend for DarkTrace dark web marketing detection platform.

## 🚀 Quick Start

### 1. Setup Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env

# Edit .env if needed (SQLite is default, no setup required)
```

### 4. Initialize Database (Optional)

```bash
# Seed database with sample data
python scripts/seed_database.py
```

### 5. Run Server

```bash
# Development mode
uvicorn main:app --reload --port 8000

# Or use Python
python main.py
```

### 6. Test API

Open browser: http://localhost:8000/docs (Swagger UI)

Or test endpoint:
```bash
curl http://localhost:8000/api/overview
```

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI app entry point
├── requirements.txt        # Python dependencies
├── .env                    # Environment variables (create from .env.example)
├── app/
│   ├── api/
│   │   └── routes/        # API route handlers
│   ├── models/            # Database models
│   ├── services/          # Business logic
│   └── database/          # Database setup
└── scripts/
    └── seed_database.py   # Database seeding script
```

## 🔌 API Endpoints

### Overview
- `GET /api/overview` - Get overview statistics

### Dashboard
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/dashboard/trends?days=7` - Campaign trends
- `GET /api/dashboard/tactics` - Tactic distribution
- `GET /api/dashboard/activity?limit=10` - Recent activity

### Vendors
- `GET /api/vendors` - List vendors (with filters)
- `GET /api/vendors/{vendor_id}` - Vendor details

### Campaigns
- `GET /api/campaigns` - Campaign network graph
- `GET /api/campaigns/{campaign_id}` - Campaign details

## 🗄️ Database

### SQLite (Default)
- No setup required
- Database file: `darktrace.db`
- Perfect for development and demo

### PostgreSQL (Production)
1. Install PostgreSQL
2. Create database: `createdb darktrace`
3. Update `.env`: `DATABASE_URL=postgresql://user:pass@localhost/darktrace`

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test overview
curl http://localhost:8000/api/overview

# Test vendors
curl http://localhost:8000/api/vendors

# Test with filters
curl "http://localhost:8000/api/vendors?risk_level=High&limit=10"
```

## 📝 Notes

- API uses in-memory fallback data if database is not available
- CORS is configured for `http://localhost:3000` (frontend)
- All endpoints return JSON
- API documentation available at `/docs`

## 🔧 Troubleshooting

**Port already in use:**
```bash
# Use different port
uvicorn main:app --reload --port 8001
```

**Database errors:**
- Check `.env` file exists
- For SQLite, ensure write permissions
- For PostgreSQL, verify connection string

**Import errors:**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

## 🚀 Next Steps

1. Connect frontend to this API
2. Add real data collection (Tor crawler)
3. Enhance NLP analysis
4. Add authentication (if needed)

