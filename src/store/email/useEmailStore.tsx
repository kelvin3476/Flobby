import { create } from "zustand";

interface EmailStore {
    /* 이메일 상태 관리 */
    email: string;
    setEmail: (email: string) => void;

    /* 이메일 유효성 검사 상태 관리 */
    isEmailValid: boolean;
    setIsEmailValid: (isEmailValid: boolean) => void;

    /* 이메일 에러 상태 관리 */
    emailError: [string,string];
    setEmailError: (emailError: [string,string]) => void;

    clearEmail: () => void;
}

const useEmailStore = create<EmailStore>((set) => ({
    email: '',
    setEmail: (email: string) => set({ email }),

    isEmailValid: true,
    setIsEmailValid: (isEmailValid: boolean) => set({ isEmailValid }),

    emailError: ['default',''],
    setEmailError: (emailError: [string,string]) => set({ emailError }),

    clearEmail: () => set({
      email: '',
      isEmailValid: true,
      emailError: ['default',''],
    })
}));

export default useEmailStore;