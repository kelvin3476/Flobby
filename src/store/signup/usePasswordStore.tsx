import { create } from "zustand";

interface PasswordStore {
    /* 비밀번호 상태 관리 */
    password: string;
    setPassword: (password: string) => void;

    /* 비밀번호 확인 상태 관리 */
    checkPassword: string;
    setCheckPassword: (checkPassword: string) => void;

    /* 비밀번호 유효성 검사 상태 관리 */
    isPasswordValid: boolean;
    setIsPasswordValid: (isNicknameValid: boolean) => void;

    /* 비밀번호 에러 상태 관리 className, errorMessage */
    passwordError: [string,string];
    setPasswordError: (passwordError: [string,string]) => void;

    /* 비밀번호 확인 에러 상태 관리 */
    checkPasswordError: [string,string];
    setCheckPasswordError: (checkPasswordError: [string,string]) => void;

    /*비밀번호 보기*/
    showPassword : object,
    setShowPassword : (showPassword:string) => void;

    clearPassword: () => void;
}

const usePasswordStore = create<PasswordStore>(set => ({
    password: '',
    setPassword: (password: string) => set({ password }),

    checkPassword: '',
    setCheckPassword: (checkPassword: string) => set({ checkPassword }),

    isPasswordValid: false,
    setIsPasswordValid: (isPasswordValid: boolean) => set({ isPasswordValid }),

    passwordError: ['default','문자+숫자+특수문자 조합 8~20자리'],
    setPasswordError: (passwordError: [string,string]) => set({ passwordError }),

    checkPasswordError: ['default',''],
    setCheckPasswordError: (checkPasswordError: [string,string]) => set({ checkPasswordError }),

    showPassword :{
        password : false,
        checkPassword : false
    },
    setShowPassword : (name) => set(state =>{
            return {
                showPassword : {
                    ...state.showPassword,
                    name : !state.showPassword[name]
                }
            };
        }),

    clearPassword: () => set({
        password: '',
        checkPassword: '',
        isPasswordValid: false,
        passwordError: ['default','문자+숫자+특수문자 조합 8~20자리'],
        checkPasswordError: ['default',''],
        showPassword: { password: false, checkPassword: false }
    })
}));
export default usePasswordStore;