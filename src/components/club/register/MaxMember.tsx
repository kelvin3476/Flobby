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
  const [inputValue, setInputValue] = useState(maxMembers || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      setIsMaxValid(true);
      setMaxError('');
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setIsMaxValid(false);
      setMaxError('인원 수를 입력해 주세요.');
      return;
    }

    let memberCount = Number(inputValue);

    if (isNaN(memberCount)) return;
    if (memberCount < 3) memberCount = 3;
    else if (memberCount > 100) memberCount = 100;

    setInputValue(String(memberCount));
    setMaxMembers(memberCount);
  };

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
