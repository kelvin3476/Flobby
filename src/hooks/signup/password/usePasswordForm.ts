import React from 'react';
import usePasswordStore from '@/store/signup/usePasswordStore';

const usePasswordForm = () => {
  const {
    password,
    setPassword,

    checkPassword,
    setCheckPassword,

    isPasswordValid,
    setIsPasswordValid,

    passwordError,
    setPasswordError,

    checkPasswordError,
    setCheckPasswordError,

    setShowPassword,
  } = usePasswordStore();

  const isValidPassword = (password: string) => {
    /* 문자+숫자+특수문자 조합 8~20자리 정규식 체크 (ASCII 코드 특수문자 32자 조건: ! @ # $ % ^ & * ( ) _ + - = [ ] { } ; : ' " , . < > / ? \ | ) */
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,20}$/;

    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPassword(value);

      if (!isValidPassword(value)) {
        setIsPasswordValid(false);
        setPasswordError(['warning', '문자+숫자+특수문자 조합 8~20자리를 입력해 주세요.']);
      } else {
        setIsPasswordValid(true);
        setPasswordError(['default', '문자+숫자+특수문자 조합 8~20자리']);
      }
    } else if (name === 'checkPassword') {
      setCheckPassword(value);

      if (password !== value) {
        setCheckPasswordError(['warning', '비밀번호가 일치하지 않습니다.']);
      } else {
        setCheckPasswordError(['default', '']);
      }
    }
  };

  const toggleShowPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;

    setShowPassword(name);
  };

  return {
    password,
    checkPassword,
    isPasswordValid,
    passwordError,
    checkPasswordError,
    handlePasswordChange,
    toggleShowPassword,
  };
};

export default usePasswordForm;
