import React from 'react';
import usePhoneStore from "../../../store/phone/usePhoneStore";

const usePhoneForm = () => {
  const {
    phone,
    setPhone,
    isPhoneValid,
    setIsPhoneValid,
  } = usePhoneStore();

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  //폰번호 입력> 유효성검사 > 정규식 만족시 본인인증 버튼 활성화
  const handlePhoneBlur = () => {
    if (phone.length == 11) {
      const updateNum = phone.slice(0,3)+"-"+phone.slice(3,7)+"-"+phone.slice(7);
        setPhone(updateNum);
      if (!isValidPhone(updateNum)) {
        setIsPhoneValid(false);
        return;
      } else {
        //중복확인 버튼 활성화
        setIsPhoneValid(true);
      }
    }
  };


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  return {
    phone,
    setPhone,
    isPhoneValid,
    setIsPhoneValid,
    handlePhoneBlur,
    handlePhoneChange,
  };
};

export default usePhoneForm;
