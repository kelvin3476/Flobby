import React from 'react';
import { useNavigate } from 'react-router-dom';

import useLoginStore from '../../store/login/useLoginStore';
import useAuthStore from '../../store/auth/useAuthStore';

import Login from '../../api/login/Login';

const useLoginForm = () => {
  const navigate = useNavigate();

  const {
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
    passwordVisible,
    setPasswordVisible,
    maintainLogin,
    setMaintainLogin,
    loginErrorMessage,
    setLoginErrorMessage,
  } = useLoginStore();

  const { setAccessToken, setTokenExpirationTime, setIsAuthenticated } = useAuthStore();

  const handleEmailBlur = () => {
    if (!email) {
      setIsEmailValid(false);
      setEmailError('이메일을 입력해 주세요.');
    } else {
      setIsEmailValid(true);
      setEmailError('');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setIsEmailValid(true);
      setEmailError('');
    } else {
      setIsEmailValid(false);
      setEmailError('이메일을 입력해 주세요.');
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      setIsPasswordValid(false);
      setPasswordError('비밀번호를 입력해 주세요.');
    } else {
      setIsPasswordValid(true);
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (e.target.value) {
      setIsPasswordValid(true);
      setPasswordError('');
    } else {
      setIsPasswordValid(false);
      setPasswordError('비밀번호를 입력해 주세요.');
    }
  };

  const handlePasswordVisibility = () => {
    if (passwordVisible) {
      setPasswordVisible(false);
    } else {
      setPasswordVisible(true);
    }
  };

  const inputType = passwordVisible ? 'text' : 'password';

  /* 자체 로그인 기능 (JWT 토큰 발급 api) */
  const webLogin = async (maintainLogin: boolean) => {
    const webLoginData = { email: email, password: password };
    try {
      const response = await Login.webLogin(webLoginData);
      const { code, message, data } = response.data;

      localStorage.clear(); // 로컬 스토리지 초기화

      switch (code) {
        case 1000 /* 로그인 성공 코드 */:
          setLoginErrorMessage(''); // 로그인 에러 메시지 초기화
          const generateTokenData = {
            memberId: data.memberId,
            email: data.email,
          };
          try {
            const response = await Login.generateJwtToken(generateTokenData);
            const { code, message } = response.data;

            switch (code) {
              case 1000 /* accessToken 발급 성공 */:
                setAccessToken(response.data.data); // access token authStore in-memory 저장 (브라우저 새로고침시 초기화)
                setTokenExpirationTime(JSON.parse(atob(response.data.data.split('.')[1])).exp);
                setIsAuthenticated(maintainLogin); // 로그인 상태 authStore in-memory 저장 (브라우저 새로고침시 초기화) /* TODO: maintainLogin: true, 로그인 유지 else 유지 안함 */
                if (response.data.data) navigate('/'); // accessToken 이 정상적 으로 발급된 경우 메인 페이지로 이동
                break;
              case 1002 /* accessToken 발급 api 예외 */:
                console.error('JWT 토큰 발급 api 요청 실패', message);
                navigate('/login');
                break;
            }
          } catch (error) {
            if (error.data.code === 1002) {
              console.error('JWT 토큰 발급 api 요청 실패', error.message);
              navigate('/login');
            }
          }
          break;
        case 1001 /* 로그인 실패 코드 */:
          console.error('로그인 실패', message);
          navigate('/login');
          break;
      }
    } catch (error) {
      switch (error.response?.data?.code) {
        case 1001:
          setLoginErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력해 주세요.')
          break;
        case 1002:
          console.error('로그인 api 요청 실패', error);
          navigate('/login');
          break;
      }
    }
  };

  const handleMaintainLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaintainLogin(event.target.checked);
  };

  return {
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
    handleEmailBlur,
    handleEmailChange,
    handlePasswordBlur,
    handlePasswordChange,
    handlePasswordVisibility,
    webLogin,
    maintainLogin,
    handleMaintainLogin,
    loginErrorMessage,
    setPasswordVisible,
    setMaintainLogin,
    setLoginErrorMessage,
  };
};

export default useLoginForm;
