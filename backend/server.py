from flask import Flask, request, jsonify
from flask_cors import CORS
from news_route import fetch_news


def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route('/search', methods=['GET'])
    def search():
        query = request.args.get('q')
        if not query:
            return jsonify({'error': 'Missing query parameter: q'}), 400

        lang = request.args.get('lang', 'en')
        country = request.args.get('country', '')
        from_date = request.args.get('from')
        to_date = request.args.get('to')

        try:
            results = fetch_news(query, lang, country, from_date, to_date)
            return jsonify(results)
        except Exception as e:
            print("Error fetching news:", e)
            return jsonify({'error': 'Failed to fetch news'}), 500

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
