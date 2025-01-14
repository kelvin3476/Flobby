import { create } from "zustand";

interface EmailStore {
    /* 이메일 상태 관리 */
    email: string;
    setEmail: (email: string) => void;

    /* 이메일 유효성 검사 상태 관리 */
    isEmailValid: boolean;
    setIsEmailValid: (isEmailValid: boolean) => void;

    /* 이메일 에러 상태 관리 */
    emailError: string;
    setEmailError: (emailError: string) => void;
}

const useEmailStore = create<EmailStore>((set) => ({
    email: '',
    setEmail: (email: string) => set({ email }),

    isEmailValid: true,
    setIsEmailValid: (isEmailValid: boolean) => set({ isEmailValid }),

    emailError: '',
    setEmailError: (emailError: string) => set({ emailError }),
}));

export default useEmailStore;