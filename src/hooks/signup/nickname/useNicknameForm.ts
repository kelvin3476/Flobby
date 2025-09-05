import React from 'react';
import useNicknameStore from '@/store/nickname/useNicknameStore';
import SignUp from '@/api/signup/SignUp';

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
    const nicknameRegex = /^[a-zA-Z0-9가-힣_]{2,12}$/;

    return nicknameRegex.test(nickname);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    setNickname(nickname);

    if (!isValidNickname(nickname)) {
      setIsNicknameValid(false);
      setNicknameError(['warning', '한글, 영어, 숫자, (_) 조합 2~12자리를 입력해 주세요.']);
    } else {
      setIsNicknameValid(true);
      setNicknameError(['default', '한글, 영어, 숫자, (_) 조합 2~12자']);
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

  return {
    nickname,
    setNickname,
    isNicknameValid,
    setIsNicknameValid,
    nicknameError,
    setNicknameError,
    handleNicknameChange,
    checkDuplicatedNickname,
  };
};

export default useNicknameForm;
