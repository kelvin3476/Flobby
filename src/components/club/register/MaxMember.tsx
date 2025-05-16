import React, { useState } from 'react';
import '../../../styles/club/register/MaxMember.scss';
import useClubRegisterStore from '../../../store/club/useClubRegisterStore';

const MaxMember = () => {
  const { setMaxMembers, isMaxValid, setIsMaxValid, maxError, setMaxError } = useClubRegisterStore();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      setIsMaxValid(true);
      setMaxError("");
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setIsMaxValid(false);
      setMaxError("인원 수를 입력해 주세요.");
      return;
    }

    let memberCount = Number(inputValue);
    
    if (isNaN(memberCount)) return;
    if (memberCount < 3) memberCount = 3;
    else if (memberCount > 100) memberCount = 100;

    setInputValue(String(memberCount));
    setMaxMembers(memberCount);
    setIsMaxValid(true);
    setMaxError("");
  };

  return (
    <div className="max-member-container">
      <div className="max-member-label-box">
        <span className="max-member-label">모임 규모</span>
        <span className="max-member-required">*</span>
      </div>
      <input
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
