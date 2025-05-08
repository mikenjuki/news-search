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
    <>
      <header>
        <Navbar />
      </header>
      <main className="min-h-5/6 pb-60 flex flex-col items-center justify-center px-4 bg-white dark:bg-black">
        <h1 className="text-6xl font-bold mb-8 text-center text-black dark:text-white">
          InfoSearch
        </h1>

        {/* Input section */}
        <div className="w-full max-w-xl space-y-4">
          <Input
            placeholder="You need it, i'll find it"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-lg"
          />

          <div className="flex gap-4">
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

            {/* <Select value={country} onValueChange={setCountry}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="ke">Kenya</SelectItem>
            </SelectContent>
          </Select> */}

            <Button onClick={handleSearch} className="flex-1">
              Search
            </Button>
          </div>
        </div>
      </main>
      <footer>
        <p>
          Powered by{" "}
          <a href="https://gnews.io/" target="_blank" rel="noreferrer">
            GNews
          </a>
        </p>
      </footer>
    </>
  );
}
