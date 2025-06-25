import React, { useEffect, useState } from 'react';
import useClubRegisterStore from '../../../store/club/useClubRegisterStore';
import Label from './Label';
import '../../../styles/club/register/MaxMember.scss';

interface classNameProps {
  className?: string;
}

const MaxMember = ({ className }: classNameProps) => {
  const {
    maxMembers,
    setMaxMembers,
    isMaxValid,
    setIsMaxValid,
    maxError,
    setMaxError,
  } = useClubRegisterStore();
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 값이 비었을 경우 유효성 검사
    if (e.target.value === '') {
      setInputValue('');
      setIsMaxValid(false);
      setMaxError('인원 수를 입력해 주세요.');
      return;
    }

    // 숫자만 입력되도록 검증
    if (/^\d*$/.test(e.target.value)) {
      setInputValue(e.target.value);
      setIsMaxValid(true);
      setMaxError('');
    }
  };

  const handleBlur = () => {
    if (inputValue) {
      let memberCount = Number(inputValue);

      if (memberCount && memberCount < 3) memberCount = 3;
      else if (memberCount && memberCount > 100) memberCount = 100;

      setInputValue(String(memberCount));
      setMaxMembers(memberCount);
    }
  };

  useEffect(() => {
    if (maxMembers) {
      setInputValue(String(maxMembers));
    } else setInputValue('');
  }, [maxMembers]);

  return (
    <div className={`max-member-container ${className}`}>
      <Label labelTitle="모임 규모" isRequired htmlFor="max-member" />
      <input
        id="max-member"
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="인원 수를 입력해 주세요. (3~100명)"
        className="max-member-input-box"
      />
      {!isMaxValid && <div className="err-message">{maxError}</div>}
    </div>
  );
};

export default MaxMember;
