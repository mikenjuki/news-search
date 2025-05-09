import { create } from 'zustand';

type SearchState = {
  query: string;
  lang: string;
  country: string;
  from: string; //
  to: string;
  committedQuery: string;
  setCommittedQuery: (query: string) => void;
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
  committedQuery: "",
  setQuery: (q: string) => set({ query: q }),
  setCommittedQuery: (q: string) => set({ committedQuery: q }),
  setLang: (lang) => set({ lang }),
  setCountry: (country) => set({ country }),
  setFrom: (val) => set({ from: val }),
  setTo: (val) => set({ to: val })
}));
