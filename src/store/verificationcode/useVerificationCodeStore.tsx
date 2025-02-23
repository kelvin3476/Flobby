import { create } from "zustand";

interface VerificationCode {
    /* 폰 인증번호 상태 관리 */
    code: string;
    setCode: (code: string) => void;

    /* 인증번호 유효성 검사 상태 관리 */
    isCodeValid: boolean;
    setIsCodeValid: (isPhoneValid: boolean) => void;

    /* 인증번호 에러 상태 관리 */
    codeError: [string,string];
    setCodeError: (codeError: [string,string]) => void;

    /*인증번호 입력 타이머*/
    timer : number;
    setTimer: (timer:number)=>void;
    display :string;
    setDisplay:(display:string)=>void;
}

const useVerificationCodeStore = create<VerificationCode>((set) => ({
    code: '',
    setCode: (code: string) => set({ code }),

    isCodeValid: false,
    setIsCodeValid: (isCodeValid: boolean) => set({ isCodeValid }),

    timer: 1000 * 60 *3,
    setTimer:(timer:number) =>set({timer}),
    display: "3:00",
    setDisplay :(display: string) => set({ display }),
    codeError: ['default',''],
    setCodeError: (codeError: [string,string]) => set({ codeError }),
}));

export default useVerificationCodeStore;