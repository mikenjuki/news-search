import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('NEWS_API_KEY')


def fetch_news(query, lang='en', country='', from_date=None, to_date=None):
    if not API_KEY:
        raise ValueError("Missing NEWS_API_KEY in environment")

    params = {
        "q": query,
        "lang": lang,
        "token": API_KEY,
        # "max": 10 # removed this cause i saw gnews limits to 10 already(but can be used for pagination like results of 5)
    }

    if country:
        params["country"] = country
    if from_date:
        params["from"] = f"{from_date}T00:00:00Z"
    if to_date:
        params["to"] = f"{to_date}T23:59:59Z"

    response = requests.get("https://gnews.io/api/v4/search", params=params)

    if response.status_code != 200:
        print("Failed API request:", response.status_code, response.text)
        return {
            "totalArticles": 0,
            "articles": []
        }

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
