import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('NEWS_API_KEY')


def fetch_news(query, lang='en', country='', from_date=None, to_date=None):
    base_url = f"https://gnews.io/api/v4/search?q={query}&lang={lang}&token={API_KEY}&max=10"

    if country:
        base_url += f"&country={country}"

    if from_date:
        from_date += "T00:00:00Z"
        base_url += f"&from={from_date}"

    if to_date:
        to_date += "T23:59:59Z"
        base_url += f"&to={to_date}"

    print("DEBUG URL:", base_url)  # debug..**remove**

    response = requests.get(base_url)
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

    base_url = f"https://gnews.io/api/v4/search?q={query}&lang={lang}&token={API_KEY}"

    if country:
        base_url += f"&country={country}"
    if from_date:
        base_url += f"&from={from_date}"
    if to_date:
        base_url += f"&to={to_date}"

    response = requests.get(base_url)
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
