import { create } from 'zustand';

interface searchKeywordStore {
  searchKeyword: string;
  setSearchKeyword: (searchKeyword: string) => void;
}

const useSearchKeywordStore = create<searchKeywordStore>(set => ({
  searchKeyword: '',
  setSearchKeyword: searchKeyword => set({ searchKeyword }),
}));

export default useSearchKeywordStore;
