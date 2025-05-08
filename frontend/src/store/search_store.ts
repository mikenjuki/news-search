import { create } from 'zustand';

type SearchState = {
  query: string;
  lang: string;
  country: string;
  from: string; //
  to: string;
  setQuery: (query: string) => void;
  setLang: (lang: string) => void;
  setCountry: (country: string) => void;
  setFrom: (val: string) => void;
  setTo: (val: string) => void;
};

export const useSearchStore = create<SearchState>((set) => ({
  query: '',
  lang: 'en',
  country: 'us',
  from: "",
  to: "",
  setQuery: (query) => set({ query }),
  setLang: (lang) => set({ lang }),
  setCountry: (country) => set({ country }),
  setFrom: (val) => set({ from: val }),
  setTo: (val) => set({ to: val })
}));
