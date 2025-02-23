import { create } from "zustand";

interface PhoneStore {
    /* 휴대폰번호 상태 관리 */
    phone: string;
    setPhone: (phone: string) => void;

    /* 휴대폰번호 유효성 검사 상태 관리 */
    isPhoneValid: boolean;
    setIsPhoneValid: (isPhoneValid: boolean) => void;

}

const usePhoneStore = create<PhoneStore>((set) => ({
    phone: '',
    setPhone: (phone: string) => set({ phone }),

    isPhoneValid: false,
    setIsPhoneValid: (isPhoneValid: boolean) => set({ isPhoneValid }),

}));

export default usePhoneStore;