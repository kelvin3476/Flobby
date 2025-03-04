import React from 'react';
import usePasswordStore from '../../../store/signup/usePasswordStore';

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
    setShowPassword,
  } = usePasswordStore();

  const isValidNickname = (nickname: string) => {
    /* 문자+숫자+특수문자 조합 8~20자리 정규식 체크 */
    const nicknameRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/-]).{8,20}$/;

    return nicknameRegex.test(nickname);
  };

  //닉네임 입력> 유효성검사 > 문자숫자 만족시 중복확인 버튼 활성화 > 중복확인 결과 체크 > 사용가능한 닉네임입니다.
  const handlePasswordBlur = () => {
    if (!isValidNickname(password)) {
      setIsPasswordValid(false);
      setPasswordError(['warning', '문자+숫자 조합 2~12자리를 입력해 주세요.']);
      return;
    } else {
      if (password !== checkPassword) return; /* 비밀번호와 비밀번호 확인 값이 일치 하지 않을 경우 */
      //중복확인 버튼 활성화
      setIsPasswordValid(true);
      setPasswordError(['default', '문자+숫자 조합 2~12자리']);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPassword(value);
    } else {
      setCheckPassword(value);
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
    handlePasswordBlur,
    handlePasswordChange,
    toggleShowPassword,
  };
};

export default usePasswordForm;
