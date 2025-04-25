import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import usePasswordStore from "../../store/password/usePasswordStore";
import Login from "../../api/login/Login";

const useEmailForm = () => {

    const navigate = useNavigate();

    const {
        password,
        setPassword,
        isPasswordValid,
        setIsPasswordValid,
        passwordError,
        setPasswordError,
        passwordVisible,
        setPasswordVisible,
        confirmPassword,
        setConfirmPassword,
        isConfirmPasswordValid,
        setIsConfirmPasswordValid,
        confirmPasswordError,
        setConfirmPasswordError,
        confirmPasswordVisible,
        setConfirmPasswordVisible,
    } = usePasswordStore();

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;

    const handlePasswordBlur = () => {
        if (!password) {
            setIsPasswordValid(false);
            setPasswordError('비밀번호를 입력해 주세요.');
            return false;
        } else if (!passwordRegex.test(password)) {
            setIsPasswordValid(false);
            setPasswordError('문자+숫자+특수문자 조합 8~20자리를 입력해 주세요.');
            return false;
        } else {
            setIsPasswordValid(true);
            setPasswordError('');
            return true;
        }
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (!newPassword) {
            setIsPasswordValid(false);
            setPasswordError('비밀번호를 입력해 주세요.');
        } else if (!passwordRegex.test(newPassword)) {
            setIsPasswordValid(false);
            setPasswordError('문자+숫자+특수문자 조합 8~20자리를 입력해 주세요.');
        } else {
            setIsPasswordValid(true);
            setPasswordError('');
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

    const handleConfirmPasswordBlur = () => {
        if (!confirmPassword) {
            setIsConfirmPasswordValid(false);
            setConfirmPasswordError('비밀번호를 한 번 더 입력해 주세요.');
            return false;
        } else if (confirmPassword !== password) {
            setIsConfirmPasswordValid(false);
            setConfirmPasswordError('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
            return false;
        } else {
            setIsConfirmPasswordValid(true);
            setConfirmPasswordError('');
            return true;
        }
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value;
        setConfirmPassword(newConfirmPassword);

        if (!newConfirmPassword) {
            setIsConfirmPasswordValid(false);
            setConfirmPasswordError('비밀번호를 한 번 더 입력해 주세요.');
        } else if (newConfirmPassword !== password) {
            setIsConfirmPasswordValid(false);
            setConfirmPasswordError('비밀번호가 일치하지 않습니다. 다시 입력해 주세요.');
        } else {
            setIsConfirmPasswordValid(true);
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordVisibility = () => {
        if (confirmPasswordVisible) {
            setConfirmPasswordVisible(false);
        } else {
            setConfirmPasswordVisible(true);
        }
    };

    const confirmPasswordInputType = confirmPasswordVisible ? 'text' : 'password';

    const handlePasswordResetSubmit = async () => {
        // 1. input에 입력된것이 없거나 유효성 검증 실패시 버튼 클릭 해도 이동 하지 않고 에러 문구 표출 로직 ex) 유효성 검증 로직 추가
        const isValidPasswordResult = handlePasswordBlur()
        const isValidPasswordCheckResult = handleConfirmPasswordBlur()

        if (!isValidPasswordResult || !isValidPasswordCheckResult) return;

        try {
            // 2. 비밀번호 변경 api 연동 로직
            Login.resetPassword({ password, confirmPassword })
            .then((response) => {
                if (response.data.code === 1000) {
                    // 3. 비밀번호 변경 성공 페이지로 이동하는 로직
                    navigate('/password/success');
                } else {
                    console.error('비밀번호 변경 api 호출 실패');
                }
            });
        } catch (error) {
            console.error('비밀번호 변경 실패', error);
        }
    };

    return {
        inputType,
        password,
        setPassword,
        isPasswordValid,
        setIsPasswordValid,
        passwordError,
        setPasswordError,
        handlePasswordBlur,
        handlePasswordChange,
        handlePasswordVisibility,
        confirmPasswordInputType,
        confirmPassword,
        setConfirmPassword,
        isConfirmPasswordValid,
        setIsConfirmPasswordValid,
        confirmPasswordError,
        setConfirmPasswordError,
        handleConfirmPasswordBlur,
        handleConfirmPasswordChange,
        handleConfirmPasswordVisibility,
        handlePasswordResetSubmit,
    };
};

export default useEmailForm;