# Micro-Dark: Illegal Marketing Detection (Safe Proof-of-Concept)

## 🚨 Problem Statement

Illegal goods and services on the dark web are not spread randomly — they are actively **marketed** using persuasive language, repeated promotions, and campaign-style messaging across hidden forums and marketplaces.

Most existing solutions focus on:

* detecting illegal listings, or
* monitoring leaked data and credentials.

There is limited focus on **how illegal marketing language and strategies operate**.

This project explores that gap in a **safe, ethical, and research-focused way**.

---

## 🎯 Objective

To design a **read-only, proof-of-concept system** that:

* Analyzes marketing-style text related to illegal goods/services
* Identifies promotional language patterns using ML
* Demonstrates how coordinated marketing behavior *can be detected*
* Operates entirely on **offline, curated datasets**

⚠️ No Tor access, no scraping, no interaction with real dark web websites.

---

## 🧠 Core Insight

> Illegal markets persist not only due to anonymity, but due to structured and repeated marketing strategies.

This project focuses on **understanding and detecting those strategies**, not enforcement or intervention.

---

## 🏗️ System Overview

* **Frontend**: Interface to submit and analyze text samples
* **Backend**: API layer handling requests and predictions
* **ML Component**: Text classification model trained on curated data
* **Storage**: Lightweight SQLite database for demo-level persistence

The system is intentionally simple to highlight **concept validation and end‑to‑end flow**.

---

## 🤖 Machine Learning Approach

* Supervised text classification for promotional language detection
* Trained on an **offline CSV dataset** representing marketing patterns
* Demonstrates feasibility of flagging promotional content

📌 The model prioritizes explainability and pipeline clarity over production-level accuracy.

---

## 🗄️ Data & Storage

* SQLite database implemented via ORM
* Used for storing demo records and analysis outputs
* Suitable for local testing and demonstration

Not designed for large-scale or real-time deployment.

---

## 🔐 Ethics & Safety

This project is built with strict ethical boundaries:

* No real dark web access
* No Tor usage
* No scraping or crawling
* No illegal content interaction

All data is **synthetic or responsibly curated** for academic and research purposes.

---

## ✅ Why This Project Is Valid

* Clear and focused problem definition
* Ethical and risk-free execution
* End-to-end working pipeline (UI + Backend + ML)
* Demonstrates feasibility without unsafe assumptions

It serves as a **strong foundation** for future, more advanced systems.

---

## 🚀 Future Extensions

* Dynamic ingestion from approved and legal sources
* Advanced NLP models (e.g., transformer-based classifiers)
* Campaign-level visualization and analytics
* Integration with legal monitoring or research platforms

---

## 🧪 Running Locally

1. Clone the repository
2. Install dependencies
3. Start backend services
4. Launch the frontend

Refer to individual directories for setup instructions.

---

## ⚠️ Disclaimer

This project is intended solely for **educational, research, and hackathon demonstration purposes**.
It does not promote, support, or interact with illegal activities.

---

## 👤 Authors

Developed as a research-driven proof-of-concept to study **illegal marketing detection techniques** in a safe and responsible manner.
