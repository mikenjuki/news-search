import { create } from 'zustand';

type SearchState = {
  query: string;
  lang: string;
  country: string;
  setQuery: (query: string) => void;
  setLang: (lang: string) => void;
  setCountry: (country: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  lang: 'en',
  country: 'us',
  setQuery: (query) => set({ query }),
  setLang: (lang) => set({ lang }),
  setCountry: (country) => set({ country }),
}));
