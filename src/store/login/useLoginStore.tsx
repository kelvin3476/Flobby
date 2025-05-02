import { create } from "zustand";

interface LoginStore {
    /* 이메일 상태 관리 */
    email: string;
    setEmail: (email: string) => void;

    /* 이메일 유효성 검사 상태 관리 */
    isEmailValid: boolean;
    setIsEmailValid: (isEmailValid: boolean) => void;

    /* 이메일 에러 상태 관리 */
    emailError: string;
    setEmailError: (emailError: string) => void;

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

    /* 로그인 유지 상태 관리 */
    maintainLogin: boolean;
    setMaintainLogin: (maintainLogin: boolean) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
    email: '',
    setEmail: (email: string) => set({ email }),

    isEmailValid: true,
    setIsEmailValid: (isEmailValid: boolean) => set({ isEmailValid }),

    emailError: '',
    setEmailError: (emailError: string) => set({ emailError }),

    password: '',
    setPassword: (password: string) => set({ password }),

    isPasswordValid: true,
    setIsPasswordValid: (isPasswordValid: boolean) => set({ isPasswordValid }),

    passwordError: '',
    setPasswordError: (passwordError: string) => set({ passwordError }),

    passwordVisible: false,
    setPasswordVisible: (passwordVisible: boolean) => set({ passwordVisible }),

    maintainLogin: false,
    setMaintainLogin: (maintainLogin: boolean) => set({ maintainLogin  }),
}));

export default useLoginStore;