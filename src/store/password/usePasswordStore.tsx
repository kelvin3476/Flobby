import { create } from "zustand";

interface PasswordStore {
    /* 비밀번호 상태 관리 */
    password: string;
    setPassword: (password: string) => void;

    /* 비밀번호 유효성 검사 상태 관리 */
    isPasswordValid: boolean;
    setIsPasswordValid: (isPasswordValid: boolean) => void;

    /* 비밀번호 에러 상태 관리 */
    passwordError: string;
    setPasswordError: (passwordError: string) => void;

    /* 비밀번호 표출 유무 상태 관리 */
    passwordVisible: boolean;
    setPasswordVisible: (passwordVisible: boolean) => void;

    /* 비밀번호 확인 상태 관리 */
    confirmPassword: string;
    setConfirmPassword: (confirmPassword: string) => void;

    /* 비밀번호 확인 유효성 검사 상태 관리 */
    isConfirmPasswordValid: boolean;
    setIsConfirmPasswordValid: (isConfirmPasswordValid: boolean) => void;

    /* 비밀번호 확인 에러 상태 관리 */
    confirmPasswordError: string;
    setConfirmPasswordError: (confirmPasswordError: string) => void;

    /* 비밀번호 확인 표출 유무 상태 관리 */
    confirmPasswordVisible: boolean;
    setConfirmPasswordVisible: (confirmPasswordVisible: boolean) => void;
}

const usePasswordStore = create<PasswordStore>((set) => ({
    password: '',
    setPassword: (password: string) => set({ password }),

    isPasswordValid: true,
    setIsPasswordValid: (isPasswordValid: boolean) => set({ isPasswordValid }),

    passwordError: '',
    setPasswordError: (passwordError: string) => set({ passwordError }),

    passwordVisible: false,
    setPasswordVisible: (passwordVisible: boolean) => set({ passwordVisible }),

    confirmPassword: '',
    setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),

    isConfirmPasswordValid: true,
    setIsConfirmPasswordValid: (isConfirmPasswordValid: boolean) => set({ isConfirmPasswordValid }),

    confirmPasswordError: '',
    setConfirmPasswordError: (confirmPasswordError: string) => set({ confirmPasswordError }),

    confirmPasswordVisible: false,
    setConfirmPasswordVisible: (confirmPasswordVisible: boolean) => set({ confirmPasswordVisible }),
}));

export default usePasswordStore;