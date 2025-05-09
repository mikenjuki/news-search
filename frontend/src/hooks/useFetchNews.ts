import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/search_store";

type Article = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
};

export function useFetchNews() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const {
    query,
    lang,
    country,
    from,
    to,
    setQuery,
    setLang,
    setCountry,
    setFrom,
    setTo,
  } = useSearchStore();

  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // query params in zustand, or redirect if no `q` i added this for ux reasons
  useEffect(() => {
    const q = queryParams.get("q");
    if (!q) {
      navigate("/");
      return;
    }

    setQuery(q);
    setLang(queryParams.get("lang") || "en");
    setCountry(queryParams.get("country") || "us");
    setFrom(queryParams.get("from") || "");
    setTo(queryParams.get("to") || "");
  }, [location.search]);

  // data from backend
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/search?q=${query}&lang=${lang}&country=${country}` +
            (from ? `&from=${from}` : "") +
            (to ? `&to=${to}` : "")
        );
        const data = await res.json();
        setResults(data.articles || []);
        setTotal(data.totalArticles || 0);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
      setLoading(false);
    };

    if (query) fetchNews();
  }, [query, lang, country, from, to]);

  return { results, loading, total };
}
