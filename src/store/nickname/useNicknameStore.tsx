import { create } from "zustand";

interface NicknameStore {
    /* 닉네임 상태 관리 */
    nickname: string;
    setNickname: (nickname: string) => void;

    /* 닉네임 유효성 검사 상태 관리 */
    isNicknameValid: boolean;
    setIsNicknameValid: (isNicknameValid: boolean) => void;

    /* 닉네임 에러 상태 관리 className, errorMessage */
    nicknameError: [string,string];
    setNicknameError: (nicknameError: [string,string]) => void;

    clearNickname: () => void;
}

const useNicknameStore = create<NicknameStore>((set) => ({
    nickname: '',
    setNickname: (nickname: string) => set({ nickname }),

    isNicknameValid: false,
    setIsNicknameValid: (isNicknameValid: boolean) => set({ isNicknameValid }),

    nicknameError: ['default','한글, 영어, 숫자, (_) 조합 2~12자'],
    setNicknameError: (nicknameError: [string,string]) => set({ nicknameError }),

    clearNickname: () => set({
      nickname: '',
      isNicknameValid: false,
      nicknameError: ['default','한글, 영어, 숫자, (_) 조합 2~12자'],
    })
}));

export default useNicknameStore;