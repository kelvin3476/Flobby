import { create } from "zustand";

interface CitizenShipStore {
    /* 국적 상태 관리 */
    foreigner: boolean;
    setForeigner: (foreigner:boolean) => void;

    clearCitizen: () => void;
}

const useCitizenStore = create<CitizenShipStore>((set) => ({
    foreigner: false,
    setForeigner: (foreigner) => set({ foreigner: !foreigner }),

    clearCitizen: () => set({
      foreigner: false,
    })
}));

export default useCitizenStore;