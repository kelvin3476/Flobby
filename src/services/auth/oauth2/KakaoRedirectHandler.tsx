import React from "react";
import { useNavigate } from "react-router";
import SocialLogin from "../../../api/login/SocialLogin";
// import Login from '../../../api/login/Login';
import useLoadingForm from "../../../hooks/loading/useLoadingForm";

const KakaoRedirectHandler = () => {
    const {isLoading, loadingSVG} = useLoadingForm();

    const navigate = useNavigate();

    /* TODO: 백엔드에서 code 값을 다르게 내려주면 해당 값에 따라 KakaoLoginCallback.ts 내부에서 분기처리 진행 필요 */
    const code = new URLSearchParams(window.location.search).get('code');

    try {
        SocialLogin.KakaoLogin(code)
        .then((response) => {
            if (response.data.code === 2002) {
                localStorage.clear();
                localStorage.setItem('kakao_account', JSON.stringify(response.data.data.kakao_account));
                navigate('/signup/region');
            } else {
                navigate('/');
                console.error('유저 정보 요청 api 실패');
            }
            // localStorage.clear(); // 로컬 스토리지 초기화
            // console.log('[response in kakakoLogin]', response);
            // switch (response.data.code) {
            //     case 2000: /* 기존 회원 로그인 성공 코드 */
            //         const generateTokenData = response.data.data; /* TODO: memberId, email 값 받아서 token 발급 받을때 사용 필요 */
            //         Login.login(generateTokenData)
            //         .then((response) => {
            //             console.log('[response in token generate]', response);
            //             if (response.status === 200) {
            //                 /*
            //                     TODO: 토큰 발급 성공
            //                       => HTTP only cookie 에서 refresh token 담아서 백엔드에서 프론트로 전달 예정,
            //                          access token response 데이터의 body 값에 담아서 백엔드에서 프론트로 전달 예정
            //                 */
            //                 // const accessToken = response.data.data.access_token;
            //                 // const refreshToken = response.data.cookie.headers.get('refresh_token');
            //                 navigate('/main')
            //             } else {
            //                 console.error('토큰 발급 실패');
            //                 navigate('/');
            //             }
            //         });
            //         break;
            //     case 2001: /* 기존 회원 다른 로그인 방법 시도시 코드 */
            //         navigate('/account/integration');
            //         break;
            //     case 2002: /* 신규 회원 로그인 시도 코드 */
            //         localStorage.setItem('kakao_account', JSON.stringify(response.data.data.kakao_account));
            //         navigate('/signup/region');
            //         break;
            // }
        });
    } catch (error) {
        console.error('카카오 소셜 로그인 실패', error);
        if (error.data.code === 1002) {
            navigate('/');
        }
    }

    return (
        <>
            <div className={`loading-container ${isLoading ? "active" : ""}`}>
                <img src={loadingSVG} alt="로딩 중..." />
            </div>
        </>
    );
}

export default KakaoRedirectHandler;