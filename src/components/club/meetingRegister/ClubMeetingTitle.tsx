import React from 'react';
import Label from '../register/Label';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

const ClubMeetingTitle = () => {
  const {
    clubMeetingTitle,
    setClubMeetingTitle,
    isClubMeetingTitleValid,
    setIsClubMeetingTitleValid,
    clubMeetingTitleError,
    setClubMeetingTitleError,
  } = useClubMeetingRegisterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setClubMeetingTitle(value);

    if (value.trim() === '') {
      setIsClubMeetingTitleValid(false);
      setClubMeetingTitleError('제목을 입력해 주세요.');
    } else {
      setIsClubMeetingTitleValid(true);
      setClubMeetingTitleError('');
    }
  };

  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="정기 모임명" isRequired htmlFor="club-meeting-title" />
      <input
        id="club-meeting-title"
        type="text"
        placeholder="모임명을 입력해 주세요."
        value={clubMeetingTitle}
        onChange={handleChange}
      />
      {!isClubMeetingTitleValid && (
        <div className="error">{clubMeetingTitleError}</div>
      )}
    </div>
  );
};

export default ClubMeetingTitle;
