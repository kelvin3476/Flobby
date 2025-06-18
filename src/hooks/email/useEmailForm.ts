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

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);

        if (email.length > 0 && !isValidEmail(email)) {
            setIsEmailValid(false);
            setEmailError(['warning','올바른 이메일 형식으로 입력해 주세요.']);
        } else {
            setIsEmailValid(true);
            setEmailError(['default','']);
        }
    }

    return {
        email,
        setEmail,
        isEmailValid,
        setIsEmailValid,
        emailError,
        setEmailError,
        handleEmailChange,
    }
}

export default useEmailForm;