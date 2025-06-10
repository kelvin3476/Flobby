import React from 'react';
import Label from '../register/Label';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

const ClubMeetingEntryFee = () => {
  const {
    entryFee,
    setEntryFee,
    isEntryFeeValid,
    setIsEntryFeeValid,
    entryFeeError,
    setEntryFeeError,
  } = useClubMeetingRegisterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntryFee(value);

    if (value.trim() === '') {
      setIsEntryFeeValid(false);
      setEntryFeeError('제목을 입력해 주세요.');
    } else {
      setIsEntryFeeValid(true);
      setEntryFeeError('');
    }
  };

  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="참가비" />
      <input
        type="text"
        placeholder="참가비를 입력해 주세요."
        value={entryFee}
        onChange={handleChange}
      />
      {!isEntryFeeValid && <div className="error">{entryFeeError}</div>}
    </div>
  );
};

export default ClubMeetingEntryFee;
