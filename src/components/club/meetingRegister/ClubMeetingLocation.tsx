import React, { useEffect, useState } from 'react';
import Label from '../register/Label';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

interface ClubMeetingLocationProps {
  isEditPage: boolean;
}

const ClubMeetingLocation = ({ isEditPage }: ClubMeetingLocationProps) => {
  const {
    clubMeetingLocation,
    setClubMeetingLocation,
    isClubMeetingLocationValid,
    setIsClubMeetingLocationValid,
    clubMeetingLocationError,
    setClubMeetingLocationError,
  } = useClubMeetingRegisterStore();

  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setClubMeetingLocation(value);

    if (value.trim() === '') {
      setIsClubMeetingLocationValid(false);
      setClubMeetingLocationError('장소를 입력해 주세요.');
    } else {
      setIsClubMeetingLocationValid(true);
      setClubMeetingLocationError('');
    }
  };

  useEffect(() => {
    if (isEditPage && clubMeetingLocation) setInputValue(clubMeetingLocation);
  }, [isEditPage, clubMeetingLocation]);

  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="장소" isRequired htmlFor="club-meeting-location" />
      <input
        id="club-meeting-location"
        type="text"
        placeholder="장소를 입력해 주세요."
        value={inputValue}
        onChange={handleChange}
      />
      {!isClubMeetingLocationValid && (
        <div className="error">{clubMeetingLocationError}</div>
      )}
    </div>
  );
};

export default ClubMeetingLocation;
