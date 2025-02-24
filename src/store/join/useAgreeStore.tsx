import { create } from "zustand";

interface AgreeStore {
  // 약관 동의 여부
  /* 약관 모두 동의 여부 */
  allAgree: boolean;
  setAllAgree: (value: boolean) => void;

  /* 서비스 이용약관 동의 여부 */
  serviceAgree: boolean;
  setServiceAgree: (value: boolean) => void;

  /* 개인정보 수집 및 이용 동의 여부 */
  privacyAgree: boolean;
  setPrivacyAgree: (value: boolean) => void;

  /*광고성 정보 수신 동의 여부 */
  marketingAgree: boolean;
  setMarketingAgree: (value: boolean) => void;
}

const useAgreeStore = create<AgreeStore>((set) => ({
  allAgree: false,
  setAllAgree: (value: boolean) =>
    set(() => ({
      allAgree: value,
      serviceAgree: value,
      privacyAgree: value,
      marketingAgree: value,
    })),
  serviceAgree: false,
  setServiceAgree: (value) =>
    set((state) => ({
      serviceAgree: value,
      allAgree: value && state.privacyAgree && state.marketingAgree,
    })),
  
  privacyAgree: false,
  setPrivacyAgree: (value) =>
    set((state) => ({
      privacyAgree: value,
      allAgree: state.serviceAgree && value && state.marketingAgree,
    })),
  
  marketingAgree: false,
  setMarketingAgree: (value) =>
    set((state) => ({
      marketingAgree: value,
      allAgree: state.serviceAgree && state.privacyAgree && value,
    })),
}));

export default useAgreeStore;
