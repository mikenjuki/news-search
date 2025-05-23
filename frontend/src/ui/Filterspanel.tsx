import { useNavigate } from "react-router-dom";

import { useSearchStore } from "../store/search_store";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../components/ui/select";
import { SheetClose } from "../components/ui/sheet";

type FiltersPanelProps = {
  onClose: () => void;
};

export default function FiltersPanel({ onClose }: FiltersPanelProps) {
  const navigate = useNavigate();

  const {
    lang,
    setLang,
    country,
    setCountry,
    query,
    setFrom,
    setTo,
    from,
    to,
  } = useSearchStore();

  //apply filters
  const handleApply = () => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set("q", query);
    if (lang) searchParams.set("lang", lang);
    if (country) searchParams.set("country", country);
    if (from) searchParams.set("from", from);
    if (to) searchParams.set("to", to);

    navigate(`/results?${searchParams.toString()}`);
    onClose();
  };

  // clear filters
  const handleClear = () => {
    setLang("en");
    setCountry("us");
    setFrom("");
    setTo("");

    // Redirect to results with just the query (or empty)
    const searchParams = new URLSearchParams();
    if (query) searchParams.set("q", query);

    navigate(`/results?${searchParams.toString()}`);
    onClose();
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">
            Language
          </label>
          <Select value={lang} onValueChange={setLang}>
            <SelectTrigger aria-label="Select language">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">
            Country
          </label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger aria-label="Select country">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="de">Germany</SelectItem>
              <SelectItem value="ke">Kenya</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 items-end">
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">
              From
            </label>
            <Input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              aria-label="Filter from date"
            />
          </div>
          <div>
            <label className="text-sm text-gray-700 dark:text-gray-300 mb-1 block">
              To
            </label>
            <Input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              aria-label="Filter to date"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <SheetClose asChild>
          <Button variant="ghost" onClick={onClose} className="cursor-pointer">
            Cancel
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button
            variant="outline"
            onClick={handleClear}
            className="cursor-pointer"
          >
            Clear Filters
          </Button>
        </SheetClose>

        <SheetClose asChild>
          <Button onClick={handleApply} className="cursor-pointer">
            Apply Filters
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}
