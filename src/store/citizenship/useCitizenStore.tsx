import { create } from "zustand";

interface CitizenShipStore {
    /* 국적 상태 관리 */
    foreigner: boolean;
    setForeigner: (foreigner:boolean) => void;
}

const useCitizenStore = create<CitizenShipStore>((set) => ({
    foreigner: false,
    setForeigner: (foreigner) => set({ foreigner: !foreigner })
}));

export default useCitizenStore;