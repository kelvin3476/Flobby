import { create } from 'zustand';
import { DEFAULT_REGION } from '../../services/main/models/RegionContextModel';

interface ClubCreateStore {
  clubName: string;
  setClubName: (clubName: string) => void;

  description: string;
  setDescription: (description: string) => void;

  autoApprovalFlag: boolean;
  setAutoApprovalFlag: (autoApprovalFlag: boolean) => void;

  mainCategory: string;
  setMainCategory: (mainCategory: string) => void;

  subCategory: string;
  setSubCategory: (subcategory: string) => void;

  location: number;
  setLocation: (location: number) => void;
}

const useClubCreateStore = create<ClubCreateStore>(set => ({
  clubName: '',
  setClubName: (clubName: string) => set({ clubName }),

  description: '',
  setDescription: (description: string) => set({ description }),

  autoApprovalFlag: false,
  setAutoApprovalFlag: (autoApprovalFlag: boolean) => set({ autoApprovalFlag }),

  mainCategory: '',
  setMainCategory: (mainCategory: string) => set({ mainCategory }),

  subCategory: '',
  setSubCategory: (subCategory: string) => set({ subCategory }),

  location: DEFAULT_REGION.regionId,
  setLocation: (location: number) => set({ location }),
}));

export default useClubCreateStore;
