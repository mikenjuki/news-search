import { useSearchStore } from "../store/search_store";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import Navbar from "../ui/Navbar";

export default function Home() {
  // const [country, setCountry] = useState("us"); //&country=${country}
  const navigate = useNavigate();

  const { query, setQuery, lang, setLang } = useSearchStore();

  const handleSearch = () => {
    if (!query) return;
    navigate(`/results?q=${query}&lang=${lang}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-black">
      <header>
        <Navbar />
      </header>

      <main className="flex-1 flex flex-col items-center justify-start px-4 py-12">
        <h1 className="text-6xl font-bold mb-8 text-center text-black dark:text-white">
          InfoSearch
        </h1>

        <div className="w-full max-w-xl space-y-4">
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

          <div className="flex gap-4 cursor-pointer">
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={handleSearch} className="flex-1 cursor-pointer">
              Search
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full bg-black flex items-center justify-center text-white py-4">
        <p>
          Powered by{" "}
          <a
            href="https://gnews.io/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            GNews
          </a>
        </p>
      </footer>
    </div>
  );
}
