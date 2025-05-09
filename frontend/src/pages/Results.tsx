import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useSearchStore } from "../store/search_store";
import { Skeleton } from "../components/ui/skeleton";
import Navbar from "../ui/Navbar";

import NoResults from "../assets/no_results.svg";
import ResultItem from "../ui/ResultItem";

type Article = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: string;
};

export default function Results() {
  const location = useLocation();
  // const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const {
    query,
    lang,
    country,
    setQuery,
    setLang,
    setCountry,
    from,
    to,
    setFrom,
    setTo,
  } = useSearchStore();
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState<number>(0);

  //handles the store
  useEffect(() => {
    const q = queryParams.get("q") || "";
    const l = queryParams.get("lang") || "en";
    const c = queryParams.get("country") || "us";
    const f = queryParams.get("from") || "";
    const t = queryParams.get("to") || "";

    setQuery(q);
    setLang(l);
    setCountry(c);
    setFrom(f);
    setTo(t);
  }, [location.search]);

  //this fetches stuff from the back end
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-[70vh] px-4 py-6 bg-white dark:bg-black text-black dark:text-white">
        {/* Results section */}
        {loading ? (
          <div className="space-y-4 max-w-3xl mx-auto">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 items-center">
                <Skeleton className="w-20 h-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 max-w-2xl mx-auto">
            {results.map((item, idx) => (
              <ResultItem
                key={idx}
                title={item.title}
                url={item.url}
                description={item.description}
                image={item.image}
                source={item.source}
              />
            ))}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Search Hits: {total.toLocaleString()}
            </p>
            {results.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-12 text-gray-500 dark:text-gray-400">
                <img
                  src={NoResults}
                  alt="No results"
                  className="w-48 h-48 mb-4"
                />
                <p>No results found.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
