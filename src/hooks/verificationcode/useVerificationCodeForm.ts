import React from 'react';
import useVerificationCodeStore from '@/store/verificationcode/useVerificationCodeStore';

const useVerificationCodeForm = () => {
  const {code, setCode, timer,display,setDisplay } = useVerificationCodeStore();

  const handleCodeBlur = () => {};

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const countTimer = (timer: number)=>{
    if (timer <= 0) {
      clearInterval(timer!); // 타이머가 0 이하로 가면 종료
      return;
    }

      setInterval(() => {
        timer = timer - 1000; // 타이머를 1초씩 감소
        const minutes = String(Math.floor((timer / (1000 * 60)) % 60)).padStart(2, '0');
        const second = String(Math.floor((timer / 1000) % 60)).padStart(2, '0');
        setDisplay(minutes + ":" + second);
      }, 1000);
    };




  return {
    code,
    setCode,
    timer,
    display,
    countTimer,
    handleCodeBlur,
    handleCodeChange
  };
};

export default useVerificationCodeForm;
