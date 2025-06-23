import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AgreeStore {
  allAgree: boolean;
  setAllAgree: (value: boolean) => void;

  serviceAgree: boolean;
  setServiceAgree: (value: boolean) => void;

  privacyAgree: boolean;
  setPrivacyAgree: (value: boolean) => void;

  marketingAgree: boolean;
  setMarketingAgree: (value: boolean) => void;

  getAgreements: () => {
    serviceAgree: boolean;
    privacyAgree: boolean;
    marketingAgree: boolean;
  };

  clearAgreements: () => void;
}

const useAgreeStore = create<AgreeStore>()(
  persist(
    (set, get) => ({
      allAgree: false,
      setAllAgree: (value: boolean) => {
        set(() => ({
          allAgree: value,
          serviceAgree: value,
          privacyAgree: value,
          marketingAgree: value,
        }));
      },
      serviceAgree: false,
      setServiceAgree: (value) => {
        set((state) => ({
          serviceAgree: value,
          allAgree: value && state.privacyAgree && state.marketingAgree,
        }));
      },

      privacyAgree: false,
      setPrivacyAgree: (value) => {
        set((state) => ({
          privacyAgree: value,
          allAgree: state.serviceAgree && value && state.marketingAgree,
        }));
      },

      marketingAgree: false,
      setMarketingAgree: (value) => {
        set((state) => ({
          marketingAgree: value,
          allAgree: state.serviceAgree && state.privacyAgree && value,
        }));
      },

      getAgreements: () => {
        const { serviceAgree, privacyAgree, marketingAgree } = get();
        return { serviceAgree, privacyAgree, marketingAgree };
      },

      clearAgreements: () => {
        set(() => ({
          allAgree: false,
          serviceAgree: false,
          privacyAgree: false,
          marketingAgree: false,
        }));
      },
    }),
    {
      name: "agreement-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAgreeStore;
