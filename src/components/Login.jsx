import '../styles/Login.scss';

const Login = () => {
  return (
    <div className="login-container">
      <h1>Flobby</h1>
      <div className="input-container">
        <input type="text" placeholder="이메일을 입력해 주세요." />
        <input type="password" placeholder="비밀번호를 입력해 주세요." />

        <div className='support-container'>
          <div className="checkbox-container">
            <input type="checkbox" id="remember" />
            <label>로그인 상태 유지</label>
          </div>

          <span onClick={() => console.log('비밀번호 찾기 클릭!!')}>비밀번호 찾기</span>
        </div>
      </div>

      <button className='login-button' onClick={() => console.log('로그인 버튼 클릭!!')}>로그인</button>

      <div className='social-login-title'>간편하게 SNS 로그인</div>

      <div className="social-login-container">
        <button className='kakao-login-button' onClick={() => console.log('카카오 소셜 로그인 버튼 클릭!!')}></button>
        <button className='naver-login-button' onClick={() => console.log('네이버 소셜 로그인 버튼 클릭!!')}></button>
        <button className='apple-login-button' onClick={() => console.log('애플 소셜 로그인 버튼 클릭!!')}></button>
        <button className='google-login-button' onClick={() => console.log('구글 소셜 로그인 버튼 클릭!!')}></button>
        <button className='facebook-login-button' onClick={() => console.log('페이스북 소셜 로그인 버튼 클릭!!')}></button>
      </div>

      <div className="signup-container">
        <span>아직 Flobby 회원이 아니신가요?</span>
      </div>

      <button className='signup-button' onClick={() => console.log('회원가입 버튼 클릭!!')}>회원가입</button>
    </div>
  );
};

export default Login;
