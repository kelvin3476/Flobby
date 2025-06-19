import React from 'react';
import { useNavigate } from "react-router-dom";

import Header from "../../components/login/Header.js";
import Footer from "../../components/login/Footer";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import useLoginForm from "../../hooks/login/useLoginForm";

import KakaoLogin from "../../services/auth/oauth2/KakaoLogin";
import NaverLogin from "../../services/auth/oauth2/NaverLogin";

import '../../styles/login/Login.scss';

const Login = () => {
    const navigate = useNavigate();

    const {
        inputType,
        email,
        setEmail,
        isEmailValid,
        setIsEmailValid,
        emailError,
        setEmailError,
        password,
        setPassword,
        isPasswordValid,
        setIsPasswordValid,
        passwordError,
        setPasswordError,
        setPasswordVisible,
        setMaintainLogin,
        setLoginErrorMessage,
        handleEmailBlur,
        handleEmailChange,
        handlePasswordBlur,
        handlePasswordChange,
        handlePasswordVisibility,
        webLogin,
        maintainLogin,
        handleMaintainLogin,
        loginErrorMessage,
    } = useLoginForm();

    /* 로그인 페이지 최초 진입시 상태 초기화 */
    React.useEffect(() => {
      setEmail('');
      setIsEmailValid(true);
      setEmailError('');
      setPassword('');
      setIsPasswordValid(true);
      setPasswordError('');
      setPasswordVisible(false);
      setMaintainLogin(false);
      setLoginErrorMessage('');
    }, []);

    return (
      <div className="login-container">
        {/* 로그인 헤더 */}
        <Header headerTitle="Flobby" />

        {/* 로그인 메인 컨텐츠 */}
        <main>
          {/* 입력 컨테이너 */}
          <div className="input-container">
            <label>
              <Input
                type="text"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                isValid={isEmailValid}
                errorMessage={emailError}
                placeholder="이메일을 입력해 주세요."
              />
            </label>

            <label>
              <Input
                type={inputType}
                value={password}
                onClick={handlePasswordVisibility}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                isValid={isPasswordValid}
                errorMessage={passwordError}
                placeholder="비밀번호를 입력해 주세요."
                onKeyDown={(event) => {
                  if (email === '' || password === '') return; /* 이메일 또는 패스워드 미 입력시 return */
                  /* 키보드 엔터 시 로그인 api 호출 */
                  if (event.key === 'Enter') {
                    webLogin(maintainLogin);
                  }
                }}
              />
            </label>

            <div className="support-wrapper">
              <div className="support-container">
                <div className="checkbox-container">
                    <input type="checkbox" id="remember" onChange={handleMaintainLogin} />
                    <label>로그인 상태 유지</label>
                </div>

                <span onClick={() => navigate('/password/find')}>비밀번호 찾기</span>
              </div>

              {loginErrorMessage && (
                <span className="login-error-message">{loginErrorMessage}</span>
              )}
            </div>
          </div>

          {/* 로그인 버튼 */}
          <Button className="login-button" title="로그인" onClick={() => webLogin(maintainLogin)}/>

          {/* 소셜 로그인 */}
          <div className="social-login-container">
            <div className="social-login-title">간편하게 SNS 로그인</div>

            <div className="social-login-button-container">
              <Button className="kakao-login-button" onClick={KakaoLogin} />
              <Button className="naver-login-button" onClick={NaverLogin} />
              <Button className="apple-login-button" onClick={() => console.log('애플 소셜 로그인 버튼 클릭!!')} />
              <Button className="google-login-button" onClick={() => console.log('구글 소셜 로그인 버튼 클릭!!')} />
              <Button className="facebook-login-button" onClick={() => console.log('페이스북 소셜 로그인 버튼 클릭!!')} />
            </div>
          </div>
        </main>

        {/* 로그인 풋터 */}
        <Footer footerTitle="아직 Flobby 회원이 아니신가요?" />
      </div>
    );
};

export default Login;
