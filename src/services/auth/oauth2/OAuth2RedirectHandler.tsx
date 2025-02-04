import React from "react";
import { useNavigate } from "react-router";

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();

    /* TODO: 백엔드에서 code 값을 다르게 내려주면 해당 값에 따라 KakaoLoginCallback.ts 내부에서 분기처리 진행 필요 */
    /*
        code: 1000 => 카카오로 로그인시 자체 서비스 신규 회원일 경우
    */
    const code = new URLSearchParams(window.location.search).get('code');

    try {
        fetch(`/api/kakao/login?code=${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((response) => {
            if (response.code === 1000) {
                localStorage.clear();
                localStorage.setItem('kakao_account', JSON.stringify(response.data.kakao_account));
                navigate('/signup');
            } else {
                navigate('/');
                console.error('유저 정보 요청 api 실패');
            }
        });
    } catch (error) {
        console.error('카카오 소셜 로그인 실패', error);
        navigate('/');
    }

    return (
        <div>로그인 중...</div>
    );
}

export default OAuth2RedirectHandler;