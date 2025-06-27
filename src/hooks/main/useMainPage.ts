import logger from '../../utils/Logger';
import useAuthStore from "../../store/auth/useAuthStore";
import useMainDataStore from "../../store/main/useMainDataStore";
import Login from "../../api/login/Login";
import Logout from '../../api/logout/Logout';

const useMainPage = () => {
    const {
        accessToken,
        setAccessToken,
        isAuthenticated,
        setIsAuthenticated,
        tokenExpirationTime,
        setTokenExpirationTime,
    } = useAuthStore();

    const {
        mainDataList,
        setMainDataList,
    } = useMainDataStore();

    /* accessToken 재발급 함수 */
    const reGenerateAccessToken = () => {
        /* HTTP Only Cookie에 저장된 refreshToken 으로 accessToken 재발급 요청 */
        Login.reGenerateJwtToken()
            .then(response => {
                if (response.data.code === 6000) {
                    setAccessToken(response.data.data);
                } else {
                    logger.error('엑세스 토큰 재발급 실패', response.data.code);
                }
            })
            .catch(error => {
                if (error.response.data.code === 6002) {
                    logger.error('리프레시 토큰 값 null', error.response.data.message);
                    logger.error('엑세스 토큰 재발급 api 요청 실패', error);
                }
            });
    }

    /* accessToken 만료 시간 계산 */
    const calculateRemainingTime = () => {
        const now = Math.floor(Date.now() / 1000); /* 현재 시간 */
        return tokenExpirationTime - now; /* 남은 만료 시간 */
    }

    /* 새로고침 시 호출되는 함수 */
    const handleRefresh = () => {
        if (isAuthenticated) {
            /* 로그인 상태 유지 선택한 경우 무조건 재발급 */
            reGenerateAccessToken();
        } else {
            /* 로그인 상태 유지 선택하지 않은 경우 만료 시간 계산 */
            const remainingTime = calculateRemainingTime();
            if (remainingTime > 0) {
                /* 남은 만료 시간 있으면 재발급 */
                reGenerateAccessToken();
            } else {
                /* 사용자 인증 관련 상태값 초기화 */
                setAccessToken(''); /* accessToken 초기화 */
                setIsAuthenticated(false); /* 로그인 상태 초기화 */
                setTokenExpirationTime(0); /* 토큰 만료 시간 초기화 */
                localStorage.removeItem('token-storage'); /* 토큰 관련 정보 localstorage 초기화 */
                /* 만료 시간 지났으면 로그아웃 처리 */
                Logout.webLogout();
            }
        }
    }

    return {
        accessToken,
        setAccessToken,
        isAuthenticated,
        reGenerateAccessToken,
        calculateRemainingTime,
        handleRefresh,
        mainDataList,
        setMainDataList,
    }
}

export default useMainPage;