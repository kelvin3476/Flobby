import React from 'react';
import { useNavigate } from "react-router-dom";

import useLoginStore from "../../store/login/useLoginStore";
import useAuthStore from "../../store/auth/useAuthStore";

import Login from "../../api/login/Login";

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
    } = useLoginStore();

    const {
        setAccessToken,
        setIsAuthenticated,
    } = useAuthStore();

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
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        if (e.target.value) {
            setIsPasswordValid(true);
            setPasswordError('');
        } else {
            setIsPasswordValid(false);
            setPasswordError('비밀번호를 입력해 주세요.');
        }
    }

    const handlePasswordVisibility = () => {
        if (passwordVisible) {
            setPasswordVisible(false);
        } else {
            setPasswordVisible(true);
        }
    }

    const inputType = passwordVisible ? 'text' : 'password';

    /* 자체 로그인 기능 (JWT 토큰 발급 api) */
    const webLogin = (maintainLogin: boolean): void => {
        const webLoginData = { email: email, password: password };
        try {
            Login.webLogin(webLoginData)
                .then((response) => {
                    localStorage.clear(); // 로컬 스토리지 초기화
                    switch (response.data.code) {
                        case 1000: /* 로그인 성공 코드 */
                            const generateTokenData = { memberId: response.data.data.memberId, email: response.data.data.email }
                            try {
                                Login.generateJwtToken(generateTokenData)
                                    .then((response) => {
                                        if (response.data.code === 1000) {
                                            setAccessToken(response.data.data); // access token authStore in-memory 저장 (브라우저 새로고침시 초기화)
                                            setIsAuthenticated(maintainLogin); // 로그인 상태 authStore in-memory 저장 (브라우저 새로고침시 초기화) /* TODO: maintainLogin: true, 로그인 유지 else 유지 안함 */
                                            navigate('/main'); // 메인 페이지로 이동
                                        } else {
                                            console.error('토큰 발급 실패');
                                            navigate('/');
                                        }
                                    })
                                    .catch((error) => {
                                        if (error.data.code === 1002) {
                                            console.error('JWT 토큰 발급 api 요청 실패', error);
                                            navigate('/');
                                        }
                                    });
                            } catch (error) {
                                if (error.data.code === 1002) {
                                    console.error('JWT 토큰 발급 api 요청 실패', error);
                                    navigate('/');
                                }
                            }
                            break;
                        case 1001: /* 로그인 실패 코드 */
                            console.error('로그인 실패', response.data.code);
                            break;
                    }
                })
                .catch((error) => {
                    if (error.data.code === 1002) {
                        console.error('로그인 api 요청 실패', error);
                        navigate('/');
                    }
                });
        } catch (error) {
            if (error.data.code === 1002) {
                console.error('로그인 api 요청 실패', error);
                navigate('/');
            }
        }
    }

    const handleMaintainLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaintainLogin(event.target.checked);
    }

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
    };
}

export default useLoginForm;