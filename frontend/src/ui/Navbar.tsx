import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useSearchStore } from "../store/search_store";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isResultsPage = location.pathname === "/results";

  const { query, setQuery, lang, country } = useSearchStore();

  const handleSearch = () => {
    if (!query) return;
    navigate(`/results?q=${query}&lang=${lang}&country=${country}`);
  };

  return (
    <nav className="w-full px-2 py-4 flex items-center justify-between bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        InfoSearch
      </div>

      {isResultsPage && (
        <div className="flex flex-1 justify-center gap-2 max-w-3xl px-4">
          <Input
            placeholder="You need it, I'll find it"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            className="text-lg"
          />
          <Button onClick={handleSearch} className="cursor-pointer">
            Search
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Filters
          </Button>
        </div>
      )}

      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
