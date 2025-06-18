import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
    tokenExpirationTime: number; /* 최초 토큰 만료 시간 (밀리초 단위) */
    setTokenExpirationTime: (time: number) => void;
    isAuthenticated: boolean; /* 로그인 유지 상태 */
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            accessToken: '',
            setAccessToken: (token: string) => set({ accessToken: token }),
            tokenExpirationTime: 0, /* 초기값은 0으로 설정 */
            setTokenExpirationTime: (time: number) => set({ tokenExpirationTime: time }),
            isAuthenticated: false,
            setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
        }),
        {
            name: 'token-storage', // localStorage key 이름
            partialize: (state) => ({
                // accessToken 제외하고 저장
                tokenExpirationTime: state.tokenExpirationTime,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;