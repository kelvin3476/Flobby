import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import logger from './Logger';
import useAuthStore from '../store/auth/useAuthStore';
import Login from '../api/login/Login';
import Logout from '../api/logout/Logout';

/* 커스텀 axios request config 타입 정의 */
type CustomAxiosRequestConfig = AxiosRequestConfig & InternalAxiosRequestConfig;

/* 기본 axios 인스턴스 설정 */
export const axiosInstance: AxiosInstance = axios.create({
  /* 프론트 배포 주소 => package.json: proxy url 로 요청 => 백엔드 배포 api 서버로 요청 */
  baseURL:
    window.location.hostname === 'localhost'
      ? import.meta.env.VITE_API_DEV_BASE_URL
      : import.meta.env.VITE_API_PROD_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials:
    true /* refresh_token 을 포함한 HttpOnly 쿠키를 전달 하기 위한 설정 (백에서도 똑같이 설정 되어 있어야함) */,
});

/* 요청 인터셉터 추가 */
axiosInstance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;
    // const accessToken = localStorage.getItem('accessToken');
    logger.log('[accessToken 요청 인터셉터]', accessToken);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

/* 응답 인터셉터 추가 */
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  error => Promise.reject(error),
  // async error => {
  //   const originalRequest = error.config;
  //   /* 401 unauthorized 에러 또는 accessToken 만료된 경우 처리 */
  //   if (error.response?.status === 401 && !originalRequest._retry) {
  //     originalRequest._retry = true;
  //
  //     try {
  //       /* refreshToken 으로 accessToken 재발급 갱신 요청 */
  //       const response = await Login.reGenerateJwtToken();
  //       const newAcessToken = response.data.data;
  //       logger.log('[newAcessToken]', newAcessToken);
  //
  //       useAuthStore.getState().setAccessToken(newAcessToken);
  //
  //       originalRequest.headers['Authorization'] = `Bearer ${newAcessToken}`;
  //       return axiosInstance(originalRequest);
  //     } catch (refreshError) {
  //       /* refreshToken 이 유효하지 않은 경우 일땐 로그아웃 처리 */
  //       await Logout.webLogout();
  //       return Promise.reject(refreshError);
  //     }
  //   }
  //
  //   return Promise.reject(error);
  // },
);

export const http = axiosInstance;
