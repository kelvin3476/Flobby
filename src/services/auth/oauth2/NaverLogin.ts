const NaverLogin = () => {
    const clientId = import.meta.env.VITE_NAVER_CLIENT_ID; // REST_API_KEY: 유출되면 안되므로 보안상 .env 파일에서 관리
    const redirectUri = import.meta.env.VITE_NAVER_REDIRECT_URI; // REDIRECT_URI: 유출되면 안되므로 보안상 .env 파일에서 관리

    window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=STATE_STRING`;
}

export default NaverLogin;