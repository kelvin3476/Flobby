import React from 'react';
import Label from '../register/Label';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

const ClubMeetingLocation = () => {
  const {
    clubMeetingLocation,
    setClubMeetingLocation,
    isClubMeetingLocationValid,
    setIsClubMeetingLocationValid,
    clubMeetingLocationError,
    setClubMeetingLocationError,
  } = useClubMeetingRegisterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClubMeetingLocation(value);

    if (value.trim() === '') {
      setIsClubMeetingLocationValid(false);
      setClubMeetingLocationError('장소를 입력해 주세요.');
    } else {
      setIsClubMeetingLocationValid(true);
      setClubMeetingLocationError('');
    }
  };
  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="장소" isRequired />
      <input
        type="text"
        placeholder="장소를 입력해 주세요."
        value={clubMeetingLocation}
        onChange={handleChange}
      />
      {!isClubMeetingLocationValid && (
        <div className="error">{clubMeetingLocationError}</div>
      )}
    </div>
  );
};

export default ClubMeetingLocation;
