from flask import Flask, request, jsonify
from flask_cors import CORS
from news_route import fetch_news

app = Flask(__name__)
CORS(app)

@app.route('/search')
def search():
    query = request.args.get('q')
    lang = request.args.get('lang', 'en')

    if not query:
        return jsonify({'error': 'Missing query'}), 400

    results = fetch_news(query, lang)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)
