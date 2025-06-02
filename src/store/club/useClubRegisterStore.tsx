import { create } from 'zustand';
import { DEFAULT_REGION } from '../../services/region/models/RegionContextModel';

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

  location: number;
  setLocation: (location: number) => void;

  isCategoryValid: boolean,
  setIsCategoryValid: (isCategoryValid: boolean) => void;

  categoryError: string,
  setCategoryError: (categoryError: string) => void;

  maxMembers: number;
  setMaxMembers: (maxMember: number) => void;

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

  titleError: "",
  setTitleError: (titleError: string) => set({ titleError }),

  descError: "",
  setDescError: (descError: string) => set({ descError }),

  descCount: 0,
  setDescCount: (descCount: number) => set({ descCount }),

  mainCategory: '',
  setMainCategory: (mainCategory: string) => set({ mainCategory }),

  subCategory: '',
  setSubCategory: (subCategory: string) => set({ subCategory }),

  location: DEFAULT_REGION.regionId,
  setLocation: (location: number) => set({ location }),

  isCategoryValid: true,
  setIsCategoryValid: (isCategoryValid: boolean) => set({ isCategoryValid }),

  categoryError: "",
  setCategoryError: (categoryError: string) => set({ categoryError }),

  maxMembers: 0,
  setMaxMembers: (maxMembers: number) => set({ maxMembers }),

  isMaxValid: true,
  setIsMaxValid: (isMaxValid: boolean) => set({ isMaxValid }),

  maxError: "",
  setMaxError: (maxError: string) => set({ maxError }),

  file: null,
  setFile: (file: File | null) => set({ file }),

  isImageFileValid: true,
  setIsImageFileValid: (isImageFileValid: boolean) => set({ isImageFileValid }),

  imageFileError: '',
  setImageFileError: (imageFileError: string) => set({ imageFileError }),
}));

export default useClubRegisterStore;
