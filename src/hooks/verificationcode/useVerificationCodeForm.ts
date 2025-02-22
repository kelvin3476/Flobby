import React from 'react';
import useVerificationCodeStore from '../../store/verificationcode/useVerificationCodeStore';

const useVerificationCodeForm = () => {
  const { code, setCode } = useVerificationCodeStore();

  const isValidPhone = (phone: string) => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleCodeBlur = () => {};

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  return {
    code,
    setCode,
    handleCodeBlur,
    handleCodeChange,
  };
};

export default useVerificationCodeForm;
