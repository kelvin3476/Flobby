import React from 'react';
import useLoginStore from "../../store/login/useLoginStore";

const useLoginForm = () => {

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
    } = useLoginStore();

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
    };
}

export default useLoginForm;