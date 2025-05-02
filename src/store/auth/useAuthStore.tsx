import { create } from 'zustand';

interface AuthStore {
    accessToken: string;
    setAccessToken: (token: string) => void;
    isAuthenticated: boolean; /* 로그인 유지 상태 */
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
    accessToken: '',
    setAccessToken: (token: string) => set({ accessToken: token }),
    isAuthenticated: false,
    setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated  }),
}));

export default useAuthStore;