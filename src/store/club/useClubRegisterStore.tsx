import { create } from 'zustand';
import { DEFAULT_REGION } from '@/services/region/models/ModalRegionListModel';

interface ClubRegisterStore {
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

  mainCategory: string;
  setMainCategory: (mainCategory: string) => void;

  subCategory: string;
  setSubCategory: (subcategory: string) => void;

  location: number | null;
  setLocation: (location: number | null) => void;

  isLocationValid: boolean;
  setIsLocationValid: (isLocationValid: boolean) => void;

  locationError: string;
  setLocationError: (locationError: string) => void;

  isCategoryValid: boolean;
  setIsCategoryValid: (isCategoryValid: boolean) => void;

  categoryError: string;
  setCategoryError: (categoryError: string) => void;

  maxMembers: number | null;
  setMaxMembers: (maxMember: number | null) => void;

  isMaxValid: boolean;
  setIsMaxValid: (isMaxValid: boolean) => void;

  maxError: string;
  setMaxError: (maxError: string) => void;

  // 업로드한 이미지 파일
  file: File | null;
  setFile: (file: File | null) => void;

  // 이미지 파일 유효성 검사값
  isImageFileValid: boolean;
  setIsImageFileValid: (isImageFileValid: boolean) => void;

  // 이미지 파일 에러 메세지
  imageFileError: string;
  setImageFileError: (imageFileError: string) => void;
}

const useClubRegisterStore = create<ClubRegisterStore>(set => ({
  clubName: '',
  setClubName: (clubName: string) => set({ clubName }),

  description: '',
  setDescription: (description: string) => set({ description }),

  isTitleValid: true,
  setIsTitleValid: (isTitleValid: boolean) => set({ isTitleValid }),

  isDescValid: true,
  setIsDescValid: (isDescValid: boolean) => set({ isDescValid }),

  titleError: '',
  setTitleError: (titleError: string) => set({ titleError }),

  descError: '',
  setDescError: (descError: string) => set({ descError }),

  descCount: 0,
  setDescCount: (descCount: number) => set({ descCount }),

  mainCategory: '',
  setMainCategory: (mainCategory: string) => set({ mainCategory }),

  subCategory: '',
  setSubCategory: (subCategory: string) => set({ subCategory }),

  location: null,
  setLocation: (location: number) => set({ location }),

  isLocationValid: true,
  setIsLocationValid: (isLocationValid: boolean) => set({ isLocationValid }),

  locationError: '',
  setLocationError: (locationError: string) => set({ locationError }),

  isCategoryValid: true,
  setIsCategoryValid: (isCategoryValid: boolean) => set({ isCategoryValid }),

  categoryError: '',
  setCategoryError: (categoryError: string) => set({ categoryError }),

  maxMembers: null,
  setMaxMembers: (maxMembers: number | null) => set({ maxMembers }),

  isMaxValid: true,
  setIsMaxValid: (isMaxValid: boolean) => set({ isMaxValid }),

  maxError: '',
  setMaxError: (maxError: string) => set({ maxError }),

  file: null,
  setFile: (file: File | null) => set({ file }),

  isImageFileValid: true,
  setIsImageFileValid: (isImageFileValid: boolean) => set({ isImageFileValid }),

  imageFileError: '',
  setImageFileError: (imageFileError: string) => set({ imageFileError }),
}));

export default useClubRegisterStore;
