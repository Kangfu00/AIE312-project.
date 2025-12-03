# Worddee.ai 📝✨

**Worddee.ai** is a full-stack web application designed to help users practice English vocabulary and sentence construction. It features an interactive "Word of the Day" challenge and an AI-powered feedback system (Mock/n8n) to score grammar and provide suggestions.

![Project Screenshot](./daily_vocab_web/public/screenshot.png) 
*(Note: You can add a screenshot of your dashboard here)*

## 🚀 Features

- **🎲 Word of the Day Challenge:** Fetches a random word with definition and difficulty level.
- **🤖 AI Scoring System:** Analyzes user sentences for grammar and relevance, providing a score (0-10) and improved suggestions.
- **📊 Learner Dashboard:** Visualizes learning progress, daily streaks, and proficiency distribution using charts.
- **💾 Persistent History:** Saves all practice sessions to a MySQL database.

## 🛠️ Tech Stack

**Frontend:**
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (with PostCSS)
- **Visualization:** Chart.js, React-Chartjs-2
- **Language:** TypeScript

**Backend:**
- **Framework:** FastAPI (Python)
- **Database:** MySQL (running in Docker)
- **ORM:** SQLAlchemy
- **API Docs:** Swagger UI / OpenAPI

**DevOps & Tools:**
- **Containerization:** Docker & Docker Compose
- **Workflow:** n8n (Integrated via Webhook logic)

---

## ⚙️ System Architecture

1.  **Frontend (Next.js)** fetches a random word from **Backend (FastAPI)**.
2.  User submits a sentence -> Frontend sends payload to Backend.
3.  **FastAPI** processes the sentence (via `mock_ai_validation` or n8n webhook).
4.  Result is saved to **MySQL Database**.
5.  **Dashboard** fetches aggregated data (`/summary`) from Backend to display charts.

---

## 🏁 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)
- Docker & Docker Compose

### 1. Setup Backend (FastAPI + MySQL)

Navigate to the API directory and start the services using Docker.

```bash
cd daily_vocab_api

# Build and start containers (FastAPI + MySQL + n8n)
docker-compose up -d --build