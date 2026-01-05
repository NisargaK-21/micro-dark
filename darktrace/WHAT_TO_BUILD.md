# 🎯 What You Need to Build Externally

## Current Status

✅ **COMPLETED:**
- Full frontend UI (Next.js)
- All pages: Landing, Dashboard, Vendors, Campaigns
- Components: Charts, Graphs, Sidebar, Cards
- Mock data structure
- API client ready (`lib/api.js`)

❌ **YOU NEED TO BUILD:**

## 1. Backend API (FastAPI) - **PRIORITY #1**

**What:** REST API that returns data to frontend

**Time:** 2-4 hours

**Steps:**
1. Create `backend/` directory
2. Setup FastAPI with CORS
3. Create endpoints matching frontend needs:
   - `GET /api/overview`
   - `GET /api/vendors`
   - `GET /api/dashboard/stats`
   - `GET /api/dashboard/trends`
   - `GET /api/campaigns`
4. Return mock data initially (copy from `darktrace/data/mockData.js`)

**See:** `BACKEND_QUICKSTART.md` for step-by-step guide

**Files to Create:**
```
backend/
├── main.py              # FastAPI app
├── requirements.txt     # Python dependencies
└── .env                 # Configuration
```

---

## 2. Database (PostgreSQL or SQLite) - **PRIORITY #2**

**What:** Store vendors, campaigns, posts, tactics

**Time:** 2-3 hours

**Options:**
- **SQLite** (easiest for demo) - No setup needed
- **PostgreSQL** (production) - Requires installation

**Schema Needed:**
- `vendors` table
- `campaigns` table
- `posts` table
- `tactics` table

**See:** `IMPLEMENTATION_ROADMAP.md` Section 5 for schema

---

## 3. Frontend-Backend Integration - **PRIORITY #3**

**What:** Connect frontend to backend API

**Time:** 1-2 hours

**Steps:**
1. Update frontend pages to use `lib/api.js` instead of mock data
2. Add loading states
3. Add error handling
4. Test all pages

**Files to Update:**
- `app/page.js`
- `app/dashboard/page.js`
- `app/vendors/page.js`
- `app/campaigns/page.js`

**Example:**
```javascript
// Before
import { overviewStats } from "@/data/mockData";

// After
import { fetchOverviewStats } from "@/lib/api";
const [stats, setStats] = useState(null);
useEffect(() => {
  fetchOverviewStats().then(setStats);
}, []);
```

---

## 4. NLP Analysis (Python) - **PRIORITY #4**

**What:** Detect marketing tactics in text

**Time:** 3-5 hours

**Options:**
- **Rule-based** (quick for demo) - Regex patterns
- **ML-based** (better accuracy) - Fine-tuned BERT

**What to Detect:**
- Is post marketing-related?
- Which tactics are used? (Urgency, Trust, Social Proof, etc.)

**Files to Create:**
```
backend/app/services/
└── nlp_analyzer.py
```

**See:** `IMPLEMENTATION_ROADMAP.md` Section 4

---

## 5. Data Collection (Tor Crawler) - **OPTIONAL for Hackathon**

**What:** Crawl dark web forums (read-only)

**Time:** 5-8 hours

**Requirements:**
- Tor installed locally
- Ethical safeguards
- Rate limiting

**For Hackathon:** 
- ⚠️ **Skip this** - Use synthetic/pre-collected data
- Focus on analysis, not collection

**See:** `IMPLEMENTATION_ROADMAP.md` Section 3

---

## 6. Graph Analysis (NetworkX/Neo4j) - **OPTIONAL for Hackathon**

**What:** Build relationship graphs between vendors/campaigns

**Time:** 3-4 hours

**For Hackathon:**
- ⚠️ **Skip this** - Use pre-built graph data
- Can add post-hackathon

**See:** `IMPLEMENTATION_ROADMAP.md` Section 6

---

## 🚀 Recommended Implementation Order

### For Hackathon Demo (Minimum Viable):

**Day 1:**
1. ✅ Backend API with mock data (2-3 hours)
2. ✅ Connect frontend to backend (1 hour)
3. ✅ Test all pages work (30 min)

**Day 2:**
4. ✅ Add SQLite database (2 hours)
5. ✅ Seed database with sample data (1 hour)
6. ✅ Update API to use database (1 hour)

**Day 3 (If Time):**
7. ✅ Add rule-based NLP (3 hours)
8. ✅ Polish UI and add loading states (1 hour)

### For Full Production (Post-Hackathon):

- Add Tor crawler
- Fine-tune BERT model
- Add Neo4j graph database
- Deploy with Docker

---

## 📋 Quick Checklist

### MVP (Working Demo):
- [ ] Backend API running on port 8000
- [ ] All API endpoints return data
- [ ] Frontend calls backend API
- [ ] All pages load data correctly
- [ ] Loading states work
- [ ] Error handling in place

### Enhanced (If Time):
- [ ] Database stores data
- [ ] API reads from database
- [ ] Basic NLP detects tactics
- [ ] Data persists between restarts

### Full System (Post-Hackathon):
- [ ] Tor crawler collects data
- [ ] ML models classify posts
- [ ] Graph analysis finds patterns
- [ ] Real-time updates

---

## 🎯 What to Focus On

**For Hackathon:**
1. **Backend API** - Get it working with mock data
2. **Frontend Integration** - Connect the two
3. **Database** - If time permits
4. **NLP** - Rule-based is fine for demo

**Skip for Now:**
- Tor crawler (use synthetic data)
- Advanced ML models (use rules)
- Graph analysis (use pre-built graphs)

---

## 📚 Documentation Files

1. **`IMPLEMENTATION_ROADMAP.md`** - Complete technical guide
2. **`BACKEND_QUICKSTART.md`** - Step-by-step backend setup
3. **`README.md`** - Project overview
4. **`WHAT_TO_BUILD.md`** - This file (summary)

---

## 🆘 Need Help?

1. Check `BACKEND_QUICKSTART.md` for backend setup
2. Check `IMPLEMENTATION_ROADMAP.md` for detailed specs
3. Test API with: `curl http://localhost:8000/api/overview`
4. Check browser console for errors

---

## ✅ Success Criteria

You're done when:
- ✅ Backend runs on port 8000
- ✅ Frontend runs on port 3000
- ✅ Frontend displays data from backend
- ✅ All pages work without errors
- ✅ Demo is ready to present!

---

**Good luck! 🚀**

