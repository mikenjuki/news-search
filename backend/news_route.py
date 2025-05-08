import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_KEY = os.getenv('NEWS_API_KEY')


def fetch_news(query, lang='en'):
    url = f"https://gnews.io/api/v4/search?q={query}&lang={lang}&token={API_KEY}"
    response = requests.get(url)
    data = response.json()

    return [
        {
            'title': article['title'],
            'url': article['url'],
            'thumbnail': article.get('image')
        } for article in data.get('articles', [])
    ]
