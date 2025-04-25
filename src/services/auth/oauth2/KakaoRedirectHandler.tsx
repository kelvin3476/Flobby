import React from "react";
import { useNavigate } from "react-router-dom";
import SocialLogin from "../../../api/login/SocialLogin";
import Login from '../../../api/login/Login';
import LoadingSpinnerController from "../../../components/controllers/LoadingSpinnerController";

const KakaoRedirectHandler = () => {
    const navigate = useNavigate();
    const code = new URLSearchParams(window.location.search).get('code');

    try {
        SocialLogin.KakaoLogin(code)
        .then((response) => {
            localStorage.clear(); // 로컬 스토리지 초기화
            switch (response.data.code) {
                case 2000: /* 기존 회원 로그인 성공 코드 */
                    const generateTokenData = { memberId: response.data.data.memberId, email: response.data.data.email }
                    try {
                        Login.generateJwtToken(generateTokenData)
                            .then((response) => {
                                if (response.data.code === 1000) {
                                    /* TODO: accessToken 처리 방식 고민 더 해보고 수정 필요 */
                                    const accessToken = response.data.data; // access token in-memory 저장 (브라우저 새로고침시 초기화)
                                    navigate('/main')
                                } else {
                                    console.error('토큰 발급 실패');
                                    navigate('/');
                                }
                            })
                            .catch((error) => {
                                console.error('JWT 토큰 발급 api 요청 실패', error);
                                navigate('/');
                            })
                    } catch (error) {
                        console.error('JWT 토큰 발급 api 요청 실패', error);
                        navigate('/');
                    }
                    break;
                case 2001: /* 기존 회원 다른 로그인 방법 시도시 코드 */
                    navigate('/account/integration'); /* TODO: 계정 통합 페이지 나중에 고려 (MVP 단계에선 패스) */
                    break;
                case 2002: /* 신규 회원 로그인 시도 코드 */
                    localStorage.setItem('kakao_account', JSON.stringify(response.data.data.kakao_account));
                    localStorage.setItem('socialType', 'kakao');
                    navigate('/signup/agreement');
                    break;
            }
        });
    } catch (error) {
        console.error('카카오 소셜 로그인 실패', error);
        if (error.data.code === 1002) {
            navigate('/');
        }
    }

    return <LoadingSpinnerController />;
}

export default KakaoRedirectHandler;