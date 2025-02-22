import { create } from "zustand";

interface PasswordStore {
    /* 닉네임 상태 관리 */
    password: string;
    setPassword: (password: string) => void;

    /* 닉네임 유효성 검사 상태 관리 */
    isPasswordValid: boolean;
    setIsPasswordValid: (isNicknameValid: boolean) => void;

    /* 닉네임 에러 상태 관리 className, errorMessage */
    passwordError: [string,string];
    setPasswordError: (passwordError: [string,string]) => void;
}

const usePasswordStore = create<PasswordStore>((set) => ({
    password: '',
    setPassword: (password: string) => set({ password }),

    isPasswordValid: false,
    setIsPasswordValid: (isPasswordValid: boolean) => set({ isPasswordValid }),

    passwordError: ['default','문자+숫자 조합 2~12자리'],
    setPasswordError: (passwordError: [string,string]) => set({ passwordError }),
}));

export default usePasswordStore;