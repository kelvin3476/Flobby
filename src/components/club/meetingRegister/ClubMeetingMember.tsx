import React, { useEffect, useState } from 'react';
import useClubMeetingRegisterStore from '@/store/club/useClubMeetingRegisterStore';
import Label from '@/components/club/register/Label';

interface ClubMeetingMemberProps {
  isEditPage: boolean;
}

const ClubMeetingMember = ({ isEditPage }: ClubMeetingMemberProps) => {
  const [inputValue, setInputValue] = useState('');

  const {
    maxParticipants,
    setMaxParticipants,
    isMaxParticipantsValid,
    setIsMaxParticipantsValid,
    maxParticipantsError,
    setMaxParticipantsError,
  } = useClubMeetingRegisterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      setIsMaxParticipantsValid(true);
      setMaxParticipantsError('');
    }
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setIsMaxParticipantsValid(false);
      setMaxParticipantsError('인원 수를 입력해 주세요.');
      return;
    }

    let memberCount = Number(inputValue);

    if (isNaN(memberCount)) return;
    if (memberCount < 3) memberCount = 3;
    else if (memberCount > 100) memberCount = 100;

    setInputValue(String(memberCount));
    setMaxParticipants(memberCount);
  };

  // 수정페이지에서 inputValue 상태값으로 업데이트
  useEffect(() => {
    if (isEditPage && maxParticipants) setInputValue(String(maxParticipants));
  }, [maxParticipants]);

  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="모집 인원" isRequired htmlFor="club-meeting-member" />
      <input
        id="club-meeting-member"
        type="text"
        placeholder="인원 수를 입력해 주세요. (3~100명)"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {!isMaxParticipantsValid && (
        <div className="error">{maxParticipantsError}</div>
      )}
    </div>
  );
};

export default ClubMeetingMember;
