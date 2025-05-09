import { Skeleton } from "../components/ui/skeleton";
import Navbar from "../ui/Navbar";

import NoResults from "../assets/no_results.svg";
import ResultItem from "../ui/ResultItem";
import { useFetchNews } from "../hooks/useFetchNews";
import { useEffect, useState } from "react";
import { SlowLoadingMessage } from "../ui/SlowLoadingMessage";

export default function Results() {
  const { results, loading, total } = useFetchNews();

  //Render has a 50s cold start if there's a 15 min downtime so this provides some ux message for the user
  const [isSlowLoading, setIsSlowLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsSlowLoading(true), 3000); // after 5s, show special message
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header>
        <Navbar />
      </header>

      <main className="min-h-[70vh] px-4 py-6 bg-white dark:bg-black text-black dark:text-white">
        {/* Results section */}
        {loading ? (
          <div className="space-y-4 max-w-3xl mx-auto text-center">
            {isSlowLoading && <SlowLoadingMessage />}

            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 max-w-2xl mx-auto border-b pb-4"
              >
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                </div>

                <Skeleton className="w-24 h-24 rounded object-cover" />
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
