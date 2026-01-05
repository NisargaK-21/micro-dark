# DarkTrace: Illegal Marketing Detection on the Dark Web

## 🚨 Problem Overview

Illegal goods and services on the dark web do not spread randomly — they are **actively marketed** using persuasive language, repeated promotions, and coordinated campaigns across hidden forums and marketplaces.

While existing tools focus on:
- detecting illegal listings, or  
- monitoring leaked data and credentials  

**there is no system that specifically detects and analyzes illegal *marketing strategies*** used on the dark web.

This project addresses that gap.

---

## 🎯 Objective

To build a **read-only, ethical, AI-driven system** that:
- Identifies illegal marketing content on dark web forums  
- Detects promotional language and campaign patterns  
- Analyzes how illegal vendors attract and retain buyers  
- Visualizes coordinated marketing behavior for research and prevention  

The goal is **early detection and insight**, not enforcement or interaction.

---

## 🧠 Key Idea

> Illegal markets survive not just because of anonymity —  
> they survive because of **effective marketing**.

By detecting marketing signals early, authorities and researchers can:
- understand evolving criminal strategies  
- disrupt campaigns before they scale  
- design better countermeasures  

---

## 🏗️ System Architecture

1. **Data Collection (Read-Only)**
   - Controlled crawling of public `.onion` forums via Tor
   - No interaction, no transactions, no authentication bypass

2. **AI & NLP Analysis**
   - Classify posts as marketing vs non-marketing
   - Detect persuasion tactics (discounts, urgency, trust signals)
   - Identify repeated or coordinated promotional text

3. **Graph & Pattern Analysis**
   - Link vendors, posts, keywords, and forums
   - Detect clusters indicating organized campaigns

4. **Visualization Dashboard**
   - Marketing intensity trends
   - Campaign similarity graphs
   - Temporal burst analysis

---

## 🧰 Tech Stack

### Frontend (✅ Completed)
- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Chart.js** → trends visualization
- **Cytoscape.js** → campaign graph
- **Lucide Icons**

### Backend (🚧 To Build)
- **Python** – primary backend language
- **FastAPI** – REST API framework
- **Tor (SOCKS Proxy)** – dark web access (read-only)

### AI / NLP (🚧 To Build)
- **Hugging Face Transformers** (BERT / DistilBERT)
- **spaCy** – entity & pattern extraction
- **scikit-learn** – baseline models

### Data & Graphs (🚧 To Build)
- **PostgreSQL** – structured data
- **MongoDB** – raw text storage
- **Neo4j / NetworkX** – graph analysis

### Deployment
- **Docker**
- Local Tor service
- Cloud deployment for demo (no Tor exposure)

---

## 🚀 Getting Started

### Frontend (Current)

```bash
cd darktrace
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Backend (To Implement)

See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) for detailed backend setup instructions.

**Quick Start:**
```bash
# Create backend directory
mkdir backend
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install fastapi uvicorn pydantic sqlalchemy

# Run API server
uvicorn main:app --reload --port 8000
```

---

## 📁 Project Structure

```
darktrace/                    # Frontend (Next.js)
├── app/                      # Next.js app router pages
│   ├── page.js              # Landing page
│   ├── dashboard/page.js    # Analytics dashboard
│   ├── vendors/page.js      # Vendor activity
│   └── campaigns/page.js    # Campaign graph
├── components/              # React components
│   ├── Sidebar.js
│   ├── StatCard.js
│   ├── MarketingChart.js
│   └── CampaignGraph.js
├── data/
│   └── mockData.js         # Mock data (replace with API)

backend/                      # Backend (To Build)
├── main.py                  # FastAPI entry point
├── app/
│   ├── api/                # API routes
│   ├── services/           # Business logic
│   │   ├── crawler.py     # Tor crawler
│   │   ├── nlp_analyzer.py
│   │   └── graph_builder.py
│   └── database/           # DB connections
└── requirements.txt
```

---

## 🔐 Ethics & Legal Considerations

This project strictly follows ethical research guidelines:

- ✅ Read-only crawling  
- ❌ No purchases or communication  
- ❌ No personal data targeting  
- ❌ No private forum access  
- ✅ Academic & defensive intent  

All data used is publicly accessible on the dark web.

---

## 🧪 Demo Scope (Hackathon-Friendly)

- Limited crawl scope  
- Synthetic or redacted examples where required  
- Focus on **pattern detection**, not raw content volume  
- Mock data for frontend demonstration

---

## 🌍 Social Impact

- Helps law enforcement and cybersecurity teams
- Supports academic research on cybercrime
- Encourages proactive prevention instead of reactive takedowns
- Highlights how persuasion fuels illegal ecosystems

---

## 🏆 Why This Project Matters

- Tackles an **underexplored angle** of cybercrime
- Technically challenging and research-driven
- High societal relevance
- Scales from academic use to real-world application

---

## 📋 Implementation Status

### ✅ Completed
- [x] Frontend UI (Next.js + Tailwind)
- [x] Dashboard with charts
- [x] Vendor activity page
- [x] Campaign network graph visualization
- [x] Mock data structure

### 🚧 In Progress / To Do
- [ ] Backend API (FastAPI)
- [ ] Database setup (PostgreSQL)
- [ ] Data collection system (Tor crawler)
- [ ] AI/NLP models (marketing detection)
- [ ] Graph analysis (NetworkX/Neo4j)
- [ ] Frontend-Backend integration

**See [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md) for detailed implementation guide.**

---

## ⚠️ Disclaimer

This project is intended **solely for educational, research, and defensive cybersecurity purposes**.  
The authors do not support or engage in any illegal activities.

---

## 📌 One-Line Summary

> *DarkTrace exposes how illegal markets grow — not by secrecy alone, but by marketing.*

---

## 📚 Documentation

- [Implementation Roadmap](./IMPLEMENTATION_ROADMAP.md) - Detailed guide for backend development
- [API Documentation](./docs/API.md) - API endpoints (to be created)
- [Architecture](./docs/ARCHITECTURE.md) - System design (to be created)

---

## 🤝 Contributing

This is a hackathon project. Contributions and improvements are welcome!

---

## 📄 License

[Add your license here]
