import { create } from 'zustand';

interface ClubCategoryStore {
  mainCategory: string;
  setMainCategory: (mainCategory: string) => void;

  subCategory: string;
  setSubCategory: (subCategory: string) => void;
}

const useClubCategoryStore = create<ClubCategoryStore>(set => ({
  mainCategory: '전체',
  setMainCategory: (mainCategory: string) => set({ mainCategory }),

  subCategory: '',
  setSubCategory: (subCategory: string) => set({ subCategory }),
}));

export default useClubCategoryStore;
