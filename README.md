# DarkTrace — Illegal Marketing Detection (Research + Demo)

**Short:** A small research/demo platform that detects and analyzes marketing-style posts (e.g., promotional language) and exposes results via a FastAPI backend and a Next.js dashboard.

---

## 🚀 What it does
- Classifies forum posts as **marketing** vs **non-marketing** (baseline scikit-learn model).  
- Provides a REST API for inference and retraining.  
- Simple dashboard in `darktrace/` (Next.js) visualizes vendors, campaigns, and trends.  
- Designed for ethical, read-only analysis and research — no interaction or transactions.

---

## 🔧 Tech & Implementation (current)
- Backend: **Python** + **FastAPI** (folder: `backend/`).
- ML: **scikit-learn** pipeline + `joblib` (`backend/ml/train_model.py`, `backend/ml/inference.py`).
- Dataset used for demo: `backend/ml/data/posts.csv`.
- DB: **SQLAlchemy** with **SQLite** by default (file: `darktrace.db`), models in `backend/app/models/`.
- Frontend: **Next.js** app in `darktrace/` (React components in `darktrace/components/`).

> Planned / roadmap items (not required to run): Transformers/Hugging Face, Neo4j/MongoDB integrations.

---

## ⚠️ Ethics & Usage
- This project is for **research, educational, and defensive** uses only. It **must not** be used to facilitate illegal activity.  
- Crawling must be **read-only**, legal, and ethical. See project docs for guidance.

---

## Quickstart — run backend locally (recommended)
1. Open a terminal and go to repo root:
   ```bash
   cd <repo-root>
   cd backend
   ```
2. Create & activate a virtual environment:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1   # PowerShell
   # OR in CMD: venv\Scripts\activate.bat
   # OR in bash/WSL: python3 -m venv venv && source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   python -m pip install --upgrade pip
   python -m pip install -r requirements.txt
   ```
4. (Optional) Seed the demo database (adds vendors, campaigns, tactics, and posts from CSV):
   ```bash
   python scripts/seed_database.py
   ```
5. Start the server (dev mode):
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```
6. Verify:
   - API root: `http://localhost:8000/`
   - API docs: `http://localhost:8000/docs`
   - Health: `http://localhost:8000/health`

7. (Optional) Run with Docker Compose (recommended for demo):
   ```bash
   docker-compose up --build
   # Once services are up, seed the DB (one-time):
   docker-compose run --rm backend python scripts/seed_database.py
   ```
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000`

---

## API — main endpoints
- POST `/api/analyze` — Analyze text: body `{ "text": "..." }` → response `{ is_marketing, confidence }`.
- POST `/api/train` — Trigger background retraining (uses `backend/ml/data/posts.csv`, optionally DB posts). **No auth** on this demo — add auth for production.
- Other read endpoints: `/api/vendors`, `/api/campaigns`, `/api/dashboard/*` (see `backend/app/api/routes/`).

---

## ML model & training
- Training script: `backend/ml/train_model.py`
  - Uses CSV at `backend/ml/data/posts.csv`.
  - Can include DB posts (if `include_db` is enabled in the script function).
  - Saves model to `backend/ml/model/marketing_detector.pkl`.
- Inference: `backend/ml/inference.py`
  - Lazy-loads the model to prevent startup failures if model missing.
- NOTE: If you encounter sklearn version warnings (model pickled with different scikit-learn), retrain with:
  ```bash
  python backend/ml/train_model.py
  ```
  or call `POST /api/train`.

---

## Data & Seeding
- Demo dataset (CSV): `backend/ml/data/posts.csv` — used for training and seeding posts.
- Seeding script: `backend/scripts/seed_database.py` — loads vendors/campaigns/tactics (hardcoded demo values) and posts from the CSV.

---

## Troubleshooting
- If `python` is not available: install Python 3.10+ from https://python.org and re-run Quickstart steps.  
- If dependencies missing: `python -m pip install -r backend/requirements.txt`.  
- If model fails to load due to scikit-learn mismatch: retrain the model with `python backend/ml/train_model.py`.

---

## Development notes
- DB schemas were adapted to use JSON columns for compatibility with SQLite (previously Postgres-only `ARRAY` types).  
- The ML inference endpoint returns a simple `{ is_marketing, confidence }` object for quick dashboard integration.
- `/api/train` runs training in the background for demo convenience — add auth or switch to synchronous workflow for production.

---

## Contributing
- PRs welcome. Suggested first steps:
  1. Fork & clone the repo
  2. Create a virtualenv and run `scripts/seed_database.py`
  3. Add tests and update README

---

## License
- Add your preferred license file (e.g., `LICENSE`) and mention it here.

---

