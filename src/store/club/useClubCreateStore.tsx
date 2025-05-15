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

  maxMembers: number;
  setMaxMembers: (maxMember: number) => void;

  file: File | null;
  setFile: (file: File | null) => void;

  isImageFileValid: boolean;
  setIsImageFileValid: (isImageFileValid: boolean) => void;

  imageFileError: string;
  setImageFileError: (imageFileError: string) => void;
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

  maxMembers: 0,
  setMaxMembers: (maxMembers: number) => set({ maxMembers }),

  file: null,
  setFile: (file: File | null) => set({ file }),

  isImageFileValid: true,
  setIsImageFileValid: (isImageFileValid: boolean) => set({ isImageFileValid }),

  imageFileError: '',
  setImageFileError: (imageFileError: string) => set({ imageFileError }),
}));

export default useClubCreateStore;
