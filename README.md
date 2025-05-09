# 📰 InfoSearch – News Search Engine built with React & Flask

A fullstack news search engine built using **Flask** (Python backend) and **React** with **Vite + TypeScript** (frontend). It integrates with the [GNews API](https://gnews.io/) to fetch relevant news articles from the last month based on user queries.

## Features

- **Search bar** to query global news
- **Language selection** ( English, German, French)
- **Country filter**
- **Date range filters**
- **Thumbnail previews** per article
- **Dark mode theme toggle**
- Skeleton loaders & mobile-responsive UI

---

## 📦 Tech Stack

| Layer    | Stack                         |
| -------- | ----------------------------- |
| Frontend | React + TypeScript (Vite)     |
| Backend  | Python + Flask + Flask-CORS   |
| News API | [GNews.io](https://gnews.io/) |
| Styling  | Tailwind CSS + ShadCN UI      |
| State    | Zustand                       |

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/mikenjuki/news-search-app.git
cd "to the directory you saved it"
```

### 2. Setup the Backend (Flask)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # on Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Set up API (set up account on GNews.io)

Add Your API Key to .env under: NEWS_API_KEY=your_gnews_api_key_here

Then run: python server.py

### 4. Setup the Frontend

```bash
cd ../frontend
npm i
npm run dev
```
