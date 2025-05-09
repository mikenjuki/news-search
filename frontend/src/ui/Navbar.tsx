import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useSearchStore } from "../store/search_store";
import { ModeToggle } from "./ModeToggle";
import FiltersPanel from "./Filterspanel";

import { Search, Filter } from "lucide-react";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isResultsPage = location.pathname === "/results";

  const { query, setQuery, lang, country, setCommittedQuery } =
    useSearchStore();

  const handleSearch = () => {
    if (!query.trim()) return;
    setCommittedQuery(query); // i added this to prevent calling the ap as a new search is entered
    navigate(`/results?q=${query}&lang=${lang}&country=${country}`);
  };

  return (
    <nav className="z-100 relative w-full px-2 py-4 flex items-center justify-between bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div
        className="text-lg font-bold cursor-pointer md:text-2xl"
        onClick={() => navigate("/")}
      >
        <span className="inline md:hidden">IS</span>
        <span className="hidden md:inline">InfoSearch</span>
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
          <Button
            onClick={handleSearch}
            className="cursor-pointer p-2 sm:px-4"
            aria-label="Search"
          >
            <Search className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="p-2 sm:px-4" aria-label="Filters">
                <Filter className="h-5 w-5 sm:hidden" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="top"
              className="top-[70px] max-h-[calc(100vh-70px)] overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="cursor-pointer">
                  Filter Results
                </SheetTitle>
              </SheetHeader>
              <FiltersPanel onClose={() => {}} />
            </SheetContent>
          </Sheet>
        </div>
      )}

      <div>
        <ModeToggle />
      </div>
    </nav>
  );
}
