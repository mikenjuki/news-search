import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('NEWS_API_KEY')


def fetch_news(query, lang='en'):
    url = f"https://gnews.io/api/v4/search?q={query}&lang={lang}&token={API_KEY}"
    response = requests.get(url)
    data = response.json()

    return {
        "totalArticles": data.get("totalArticles", 0),
        "articles": [
            {
                "title": article["title"],
                "description": article.get("description", ""),
                "url": article["url"],
                "image": article.get("image"),
                "publishedAt": article["publishedAt"],
                "source": article.get("source", {}).get("name", "")
            }
            for article in data.get("articles", [])
        ]
    }
