import React from 'react';
import useNicknameStore from '../../../store/nickname/useNicknameStore';
import SignUp from '../../../api/signup/SignUp';

const useNicknameForm = () => {
  const {
    nickname,
    setNickname,
    isNicknameValid,
    setIsNicknameValid,
    nicknameError,
    setNicknameError,
  } = useNicknameStore();

  const isValidNickname = (nickname: string) => {
    const nicknameRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{2,12}$/;

    return nicknameRegex.test(nickname);
  };

  //닉네임 입력> 유효성검사 > 문자숫자 만족시 중복확인 버튼 활성화 > 중복확인 결과 체크 > 사용가능한 닉네임입니다.
  const handleNicknameBlur = () => {
    if (!isValidNickname(nickname)) {
      setIsNicknameValid(false);
      setNicknameError(['warning', '문자+숫자 조합 2~12자리를 입력해 주세요.']);
      return;
    } else {
      //중복확인 버튼 활성화
      setIsNicknameValid(true);
      setNicknameError(['default', '문자+숫자 조합 2~12자리']);
    }
  };

  const checkDuplicatedNickname = (nickname: string) => {
    try {
      SignUp.checkNickname(nickname).then((res) => {
        if (res.data.code !== 1000) {
          setNicknameError(['warning', '이미 사용 중인 닉네임입니다.']);
          setIsNicknameValid(false);
        } else {
          setIsNicknameValid(true);
          setNicknameError(['valid', '사용 가능한 닉네임입니다.']);
        }
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return {
    nickname,
    setNickname,
    isNicknameValid,
    setIsNicknameValid,
    nicknameError,
    setNicknameError,
    handleNicknameBlur,
    handleNicknameChange,
    checkDuplicatedNickname,
  };
};

export default useNicknameForm;
