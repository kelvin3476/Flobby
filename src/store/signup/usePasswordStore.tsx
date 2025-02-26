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

    /*비밀번호 보기*/
    showPassword : object,
    setShowPassword : (showPassword:string) => void;
}

const usePasswordStore = create<PasswordStore>(set => ({
    password: '',
    setPassword: (password: string) => set({ password }),

    checkPassword: '',
    setCheckPassword: (checkPassword: string) => set({ checkPassword }),

    isPasswordValid: false,
    setIsPasswordValid: (isPasswordValid: boolean) => set({ isPasswordValid }),

    passwordError: ['default','문자+숫자 조합 2~12자리'],
    setPasswordError: (passwordError: [string,string]) => set({ passwordError }),

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
}));
export default usePasswordStore;