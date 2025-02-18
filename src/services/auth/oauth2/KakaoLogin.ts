const KakaoLogin = () => {
    const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID; // REST_API_KEY: 유출되면 안되므로 보안상 .env 파일에서 관리
    const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI; // REDIRECT_URI: 유출되면 안되므로 보안상 .env 파일에서 관리

    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`; // 카카오 로그인 페이지로 이동
};

export default KakaoLogin;