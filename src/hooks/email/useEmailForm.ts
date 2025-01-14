import React from "react";
import useEmailStore from "../../store/email/useEmailStore";

const useEmailForm = () => {

    const {
        email,
        setEmail,
        isEmailValid,
        setIsEmailValid,
        emailError,
        setEmailError,
    } = useEmailStore();

    const handleEmailBlur = () => {
        if (!email) {
            setIsEmailValid(false);
            setEmailError('이메일을 입력해 주세요.');
        } else {
            setIsEmailValid(true);
            setEmailError('');
        }
    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        if (e.target.value) {
            setIsEmailValid(true);
            setEmailError('');
        } else {
            setIsEmailValid(false);
            setEmailError('이메일을 입력해 주세요.');
        }
    }

    return {
        email,
        setEmail,
        isEmailValid,
        setIsEmailValid,
        emailError,
        setEmailError,
        handleEmailBlur,
        handleEmailChange,
    }
}

export default useEmailForm;