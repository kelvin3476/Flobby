import React from 'react';
import logger from '../../utils/Logger';
import useAuthStore from "../../store/auth/useAuthStore";
import Login from "../../api/login/Login";

const useMainPage = () => {
    const {
        accessToken,
        setAccessToken,
        isAuthenticated,
    } = useAuthStore();

    /* accessToken 재발급 함수 */
    const reGenerateAccessToken = () => {
        /* HTTP Only Cookie에 저장된 refreshToken 으로 accessToken 재발급 요청 */
        Login.reGenerateJwtToken()
            .then(response => {
                logger.log('[response]', response);
                if (response.data.code === 1000) {
                    logger.log('엑세스 토큰 재발급 성공', response.data.data);
                    /* TODO: 새로 재발급 받은 accessToken 값 유지 하다가 만료 되면 또 재발급 요청 처리 필요 */
                    const newAccessToken = response.data.data;
                    logger.log('[newAccessToken]', newAccessToken);
                    setAccessToken(newAccessToken);
                } else {
                    logger.error('엑세스 토큰 재발급 실패', response.data.code);
                }
            })
            .catch(error => {
                if (error.data.code === 1002) {
                    logger.error('엑세스 토큰 재발급 api 요청 실패', error);
                }
            });
    }

    /* accessToken 만료 시간 계산 */
    const calculateRemainingTime = () => {
        const accessTokenExpirationTime = JSON.parse(atob(accessToken.split('.')[1])).exp; /* accessToken 발급시 설정된 만료 시간 */
        const now = Math.floor(Date.now() / 1000); /* 현재 시간 */
        return accessTokenExpirationTime - now; /* 남은 만료 시간 */
    }

    React.useEffect(() => {
        if (!accessToken) return;

        /* accessToken 만료 시간 계산 */
        const remainingTime = calculateRemainingTime();

        /*
            case 1: 로그인 상태 유지 o,
            case 1-1: 로그인 상태 유지 o, 새로고침으로 인해 accessToken 만료됨 => 재발급 요청
            case 1-2: 로그인 상태 유지 o, accessToken 만료됨 => 재발급 요청 후 로그인 유지 처리
            case 1-3: 로그인 상태 유지 o, accessToken 아직 유효한데 새로고침 할 경우 => 로그인 유지 처리
            case 1-4: 로그인 상태 유지 o, accessToken 유효한 경우 => 만료시간 까지 로그인 유지 처리
            case 2: 로그인 상태 유지 x,
            case 2-1: 로그인 상태 유지 x, 새로고침으로 인해 accessToken 만료됨 => 재발급 요청
            case 2-2: 로그인 상태 유지 x, accessToken 순수 만료 => 로그아웃 된것처럼 처리
            case 2-3: 로그인 상태 유지 x, accessToken 아직 유효한데 새로고침 할 경우 => 만료시간 까지 로그인 유지 처리
            case 2-4: 로그인 상태 유지 x, accessToken 유효한 경우 => 만료시간 까지 로그인 유지 처리
        */

        /* case 1: 로그인 상태 유지 o */
        if (isAuthenticated === true) {
            /* case 1-1: 로그인 상태 유지 o, accessToken 만료된 경우 */
            if (remainingTime <= 0) {
                /* case 1-1-1: 로그인 상태 유지 o, accessToken 만료된 경우 (새로고침) => 재발급 요청 */
                if ((performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload") {
                    /* TODO: accessToken 유효한 경우 만료시간 까지 로그인 유지 처리 필요 */
                    const timeoutId = setTimeout(() => {
                        console.log('[accessToken 만료됨 → 재발급 요청]');
                        /* HTTP Only Cookie에 저장된 refreshToken 으로 accessToken 재발급 요청 */
                        /* TODO: 새로고침으로 인해 accessToken 만료 되는 부분 재발급 말고 유지 시킬만한 방법 찾아서 해결 필요 */
                        reGenerateAccessToken();
                    }, (remainingTime + 3) * 1000) // test: 13초 이후 재발급 요청

                    return () => clearTimeout(timeoutId);
                } else {
                    /* case 1-1-2: 로그인 상태 유지 o, accessToken 만료된 경우 (새로고침 아님, 순수 만료 또는 다른 이벤트) => 재발급 요청 후 로그인 유지 처리 */
                    reGenerateAccessToken();
                }
            } else {
                /* case 1-2: 로그인 상태 유지 o, accessToken 유효한 경우 */
                /* case 1-2-1: 로그인 상태 유지 o, accessToken 유효한 경우 (새로고침) => 재발급 요청 */
                if ((performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload") {
                    /* TODO: accessToken 유효한 경우 만료시간 까지 로그인 유지 처리 필요 */
                    const timeoutId = setTimeout(() => {
                        console.log('[accessToken 만료됨 → 재발급 요청]');
                        /* HTTP Only Cookie에 저장된 refreshToken 으로 accessToken 재발급 요청 */
                        /* TODO: 새로고침으로 인해 accessToken 만료 되는 부분 재발급 말고 유지 시킬만한 방법 찾아서 해결 필요 */
                        reGenerateAccessToken();
                    }, (remainingTime + 3) * 1000) // test: 13초 이후 재발급 요청

                    return () => clearTimeout(timeoutId);
                } else {
                    /* case 1-2-2: 로그인 상태 유지 o, accessToken 유효한 경우 (새로고침 아님, 순수 만료 또는 다른 이벤트) => 재발급 요청 후 로그인 유지 처리 */
                    reGenerateAccessToken();
                }
            }
        } else {
            /* case 2: 로그인 상태 유지 x */
            /* case 2-1: 로그인 상태 유지 x, accessToken 만료된 경우 */
            if (remainingTime <= 0) {
                /* case 2-1-1: 로그인 상태 유지 x, accessToken 만료된 경우 (이미 만료된거라 새로고침 여부 상관 x) => 화면 유지 및 로그아웃 처리 */
                setAccessToken(''); // accessToken 초기화
                console.log('[로그아웃 처리]');
            } else {
                /* case 2-2: 로그인 상태 유지 x, accessToken 유효한 경우 */
                /* case 2-2-1: 로그인 상태 유지 x, accessToken 유효한 경우 (새로고침) => 재발급 요청 */
                logger.log('[accessToken]', accessToken);
                if ((performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload") {
                    /* TODO: accessToken 유효한 경우 만료시간 까지 로그인 유지 처리 필요 */
                    const timeoutId = setTimeout(() => {
                        console.log('[accessToken 만료됨 → 재발급 요청]');
                        /* HTTP Only Cookie에 저장된 refreshToken 으로 accessToken 재발급 요청 */
                        /* TODO: 새로고침으로 인해 accessToken 만료 되는 부분 재발급 말고 유지 시킬만한 방법 찾아서 해결 필요 */
                        reGenerateAccessToken();
                    }, (remainingTime - 5) * 1000) // test: 13초 이후 재발급 요청

                    return () => clearTimeout(timeoutId);
                } else {
                    /* case 2-2-2: 로그인 상태 유지 x, (새로고침 아님, 순수 만료 또는 다른 이벤트) => 재발급 요청 후 로그인 유지 처리 */
                    /* TODO: accessToken 유효한 경우 만료시간 까지 로그인 유지 처리 필요 */
                    const timeoutId = setTimeout(() => {
                        console.log('[accessToken 만료됨 → 재발급 요청]');
                        /* HTTP Only Cookie에 저장된 refreshToken 으로 accessToken 재발급 요청 */
                        /* TODO: 새로고침으로 인해 accessToken 만료 되는 부분 재발급 말고 유지 시킬만한 방법 찾아서 해결 필요 */
                        reGenerateAccessToken();
                    }, (remainingTime + 3) * 1000) // test: 13초 이후 재발급 요청

                    return () => clearTimeout(timeoutId);
                }
            }
        }
    }, [accessToken])

    return {
        accessToken,
    }
}

export default useMainPage;