import React from 'react';
import { useNavigate } from "react-router";

import Header from "../../components/login/Header.js";
import Footer from "../../components/login/Footer";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";

import useLoginForm from "../../hooks/login/useLoginForm";

import '../../styles/login/Login.scss';

const Login = () => {
    const navigate = useNavigate();

    const {
        inputType,
        email,
        isEmailValid,
        emailError,
        password,
        isPasswordValid,
        passwordError,
        handleEmailBlur,
        handleEmailChange,
        handlePasswordBlur,
        handlePasswordChange,
        handlePasswordVisibility,
    } = useLoginForm();

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
              />
            </label>

            <div className="support-container">
              <div className="checkbox-container">
                <input type="checkbox" id="remember" />
                <label>로그인 상태 유지</label>
              </div>

              <span onClick={() => navigate('/password/find')}>비밀번호 찾기</span>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <Button className="login-button" title="로그인" onClick={() => console.log('로그인 버튼 클릭!!')}/>

          {/* 소셜 로그인 */}
          <div className="social-login-container">
            <div className="social-login-title">간편하게 SNS 로그인</div>

            <div className="social-login-button-container">
              <Button className="kakao-login-button" onClick={() => console.log('카카오 소셜 로그인 버튼 클릭!!')} />
              <Button className="naver-login-button" onClick={() => console.log('네이버 소셜 로그인 버튼 클릭!!')} />
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
