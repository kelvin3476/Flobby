import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/* 커스텀 axios request config 타입 정의 */
type CustomAxiosRequestConfig = AxiosRequestConfig & InternalAxiosRequestConfig;

/* 기본 axios 인스턴스 설정 */
export const axiosInstance: AxiosInstance = axios.create({
  /* 프론트 배포 주소 => package.json: proxy url 로 요청 => 백엔드 배포 api 서버로 요청 */
  baseURL: window.location.hostname === 'localhost' ? import.meta.env.VITE_API_DEV_BASE_URL : import.meta.env.VITE_API_PROD_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, /* TODO: refresh_token 을 포함한 HttpOnly 쿠키를 전달 하기 위한 설정 추후 확인 후 연동 필요 */
});

/* 요청 인터셉터 추가 */
axiosInstance.interceptors.request.use(
    (config: CustomAxiosRequestConfig) => {
        return config;
    },
    (error) => Promise.reject(error)
);

/* 응답 인터셉터 추가 */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => Promise.reject(error)
);

export const http = axiosInstance;