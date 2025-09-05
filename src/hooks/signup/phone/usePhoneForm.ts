import React from 'react';
import usePhoneStore from "@/store/phone/usePhoneStore";
import { http } from '@/utils/Http';
import useVerificationCodeStore from "@/store/verificationcode/useVerificationCodeStore";
import useVerificationCodeForm from "@/hooks/verificationcode/useVerificationCodeForm";

const usePhoneForm = () => {
  const {
    phone,
    setPhone,
    isPhoneValid,
    setIsPhoneValid,
  } = usePhoneStore();

  const {
    timer,
    countTimer
  } = useVerificationCodeForm();

  const {
    setCodeError
  }= useVerificationCodeStore();

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

  const sendVerificationCode = async (phone:string) => {
    //아직 api 없음
    // const res = await http.post(`/send-code`,phone);

    //timer count 시작
    countTimer(timer);

    // if(res.data.code === 1000){
    setCodeError(['valid', '인증되었습니다.']);
    // }else{
    setCodeError(['warning', '올바른 인증번호를 입력해주세요.']);
    // }

    if(timer >= 0){
      setCodeError(['warning', '인증번호의 유효기간이 만료되었습니다. 다시 시도해 주세요.']);
    }

  };

  return {
    phone,
    setPhone,
    isPhoneValid,
    setIsPhoneValid,
    handlePhoneBlur,
    handlePhoneChange,
    sendVerificationCode
  };
};

export default usePhoneForm;
