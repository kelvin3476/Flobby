import React from "react";
import { useNavigate } from "react-router";

const NaverRedirectHandler = () => {
    const navigate = useNavigate();

    /* TODO: 백엔드에서 code 값을 다르게 내려주면 해당 값에 따라 fetch() 내부에서 분기처리 진행 필요 */
    const code = new URLSearchParams(window.location.search).get('code');
    const state = new URLSearchParams(window.location.search).get('state');

    try {
        fetch(`/api/naver/login?code=${code}&state=${state}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((response) => {
            if (response.code === 2003) {
                localStorage.clear();
                localStorage.setItem('naver_account', JSON.stringify(response.data.response));
                navigate('/signup');
            } else {
                navigate('/');
                console.error('유저 정보 요청 api 실패');
            }
        });
    } catch (error) {
        console.error('네이버 소셜 로그인 실패', error);
        navigate('/');
    }

    return (
        <div>로그인 중...</div>
    );
}

export default NaverRedirectHandler;