import { create } from 'zustand';
import { DEFAULT_REGION } from '../../services/main/models/RegionContextModel';

interface ClubCreateStore {
  clubName: string;
  setClubName: (clubName: string) => void;

  description: string;
  setDescription: (description: string) => void;

  isTitleValid: boolean;
  setIsTitleValid: (isTitleValid: boolean) => void;

  isDescValid: boolean;
  setIsDescValid: (isDescValid: boolean) => void;

  titleError: string;
  setTitleError: (titleError: string) => void;

  descError: string;
  setDescError: (descError: string) => void;

  descCount: number;
  setDescCount: (descCount: number) => void;

  autoApprovalFlag: boolean;
  setAutoApprovalFlag: (autoApprovalFlag: boolean) => void;

  mainCategory: string;
  setMainCategory: (mainCategory: string) => void;

  subCategory: string;
  setSubCategory: (subcategory: string) => void;

  location: number;
  setLocation: (location: number) => void;

  maxMembers: number;
  setMaxMembers: (maxMember: number) => void;
}

const useClubCreateStore = create<ClubCreateStore>(set => ({
  clubName: '',
  setClubName: (clubName: string) => set({ clubName }),

  description: '',
  setDescription: (description: string) => set({ description }),

  isTitleValid: true,
  setIsTitleValid: (isTitleValid: boolean) => set({ isTitleValid }),

  isDescValid: true,
  setIsDescValid: (isDescValid: boolean) => set({ isDescValid }),

  titleError: "",
  setTitleError: (titleError: string) => set({ titleError }),

  descError: "",
  setDescError: (descError: string) => set({ descError }),

  descCount: 0,
  setDescCount: (descCount: number) => set({ descCount }),

  autoApprovalFlag: false,
  setAutoApprovalFlag: (autoApprovalFlag: boolean) => set({ autoApprovalFlag }),

  mainCategory: '',
  setMainCategory: (mainCategory: string) => set({ mainCategory }),

  subCategory: '',
  setSubCategory: (subCategory: string) => set({ subCategory }),

  location: DEFAULT_REGION.regionId,
  setLocation: (location: number) => set({ location }),

  maxMembers: 0,
  setMaxMembers: (maxMembers: number) => set({ maxMembers }),
}));

export default useClubCreateStore;
