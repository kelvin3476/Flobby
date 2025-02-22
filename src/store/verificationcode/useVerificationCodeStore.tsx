import { create } from "zustand";

interface VerificationCode {
    /* 폰 인증번호 상태 관리 */
    code: string;
    setCode: (code: string) => void;

    /* 인증번호 유효성 검사 상태 관리 */
    isCodeValid: boolean;
    setIsCodeValid: (isPhoneValid: boolean) => void;

    /*인증번호 입력시간*/
    timer :string;
    setTimer :(timer:string) => void;
}

const useVerificationCodeStore = create<VerificationCode>((set) => ({
    code: '',
    setCode: (code: string) => set({ code }),

    isCodeValid: false,
    setIsCodeValid: (isCodeValid: boolean) => set({ isCodeValid }),

    timer: "3:00",
    setTimer: (timer: string) => set({ timer })

}));

export default useVerificationCodeStore;