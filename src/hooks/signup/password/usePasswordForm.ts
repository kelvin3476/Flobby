import React from 'react';
import usePasswordStore from '../../../store/signup/usePasswordStore';

const usePasswordForm = () => {
  const {
    password,
    setPassword,
    isPasswordValid,
    setIsPasswordValid,
    passwordError,
    setPasswordError,
    showPassword,
    setShowPassword
  } = usePasswordStore();

  const isValidNickname = (nickname: string) => {
    const nicknameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{2,12}$/;

    return nicknameRegex.test(nickname);
  };

  //닉네임 입력> 유효성검사 > 문자숫자 만족시 중복확인 버튼 활성화 > 중복확인 결과 체크 > 사용가능한 닉네임입니다.
  const handlePasswordBlur = () => {
    if (!isValidNickname(password)) {
      setIsPasswordValid(false);
      setPasswordError(['warning', '문자+숫자 조합 2~12자리를 입력해 주세요.']);
      return;
    } else {
      //중복확인 버튼 활성화
      setIsPasswordValid(true);
      setPasswordError(['default', '문자+숫자 조합 2~12자리']);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };


  return {
    password,
    setPassword,
    isPasswordValid,
    passwordError,
    handlePasswordBlur,
    handlePasswordChange,
    showPassword,
    setShowPassword
  };
};

export default usePasswordForm;
