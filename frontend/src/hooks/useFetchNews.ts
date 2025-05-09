import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/search_store";
import { useDebounce } from "use-debounce";

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
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);

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

  // parse query params and sync with Zustand
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
  }, [location.search, navigate, queryParams, setCountry, setFrom, setLang, setQuery, setTo]);

  // debounce Zustand state values (i added this to prevent multiple api calls)
  const [debouncedQuery] = useDebounce(query, 400);
  const [debouncedLang] = useDebounce(lang, 400);
  const [debouncedCountry] = useDebounce(country, 400);
  const [debouncedFrom] = useDebounce(from, 400);
  const [debouncedTo] = useDebounce(to, 400);

  // fetch news using debounced values
  useEffect(() => {
    if (!debouncedQuery) return;

    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${backendURL}/search?q=${debouncedQuery}&lang=${debouncedLang}&country=${debouncedCountry}` +
            (debouncedFrom ? `&from=${debouncedFrom}` : "") +
            (debouncedTo ? `&to=${debouncedTo}` : "")
        );
        const data = await res.json();
        setResults(data.articles || []);
        setTotal(data.totalArticles || 0);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
      setLoading(false);
    };

    fetchNews();
  }, [debouncedQuery, debouncedLang, debouncedCountry, debouncedFrom, debouncedTo, backendURL]);

  return { results, loading, total };
}
