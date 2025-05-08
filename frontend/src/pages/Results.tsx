import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchStore } from "../store/search_store";
import { Skeleton } from "../components/ui/skeleton";
import Navbar from "../ui/Navbar";

type Article = {
  title: string;
  url: string;
  thumbnail: string | null;
};

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const { query, lang, country, setQuery, setLang, setCountry } =
    useSearchStore();
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  //handles the store
  useEffect(() => {
    if (location.pathname === "/results") {
      setQuery(queryParams.get("q") || "");
      setLang(queryParams.get("lang") || "en");
      setCountry(queryParams.get("country") || "us");
    }
  }, []);

  //this fetches stuff from the back end
  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/search?q=${query}&lang=${lang}&country=${country}`
        );
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
      setLoading(false);
    };

    if (query) fetchNews();
  }, [query, lang, country]);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-screen px-4 py-6 bg-white dark:bg-black text-black dark:text-white">
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
          <div className="space-y-6 max-w-3xl mx-auto">
            {results.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                {item.thumbnail && (
                  <img
                    src={item.thumbnail}
                    alt="thumb"
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 visited:text-purple-700 font-medium hover:underline"
                >
                  {item.title}
                </a>
              </div>
            ))}
            {results.length === 0 && (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No results found.
              </p>
            )}
          </div>
        )}
      </main>
    </>
  );
}
