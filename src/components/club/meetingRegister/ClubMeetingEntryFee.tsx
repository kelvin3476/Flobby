import React from 'react';
import Label from '../register/Label';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

const ClubMeetingEntryFee = () => {
  const { entryFee, setEntryFee } = useClubMeetingRegisterStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEntryFee(value);
  };

  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="참가비" htmlFor="club-meeting-entryfee" />
      <input
        id="club-meeting-entryfee"
        type="text"
        placeholder="참가비를 입력해 주세요."
        value={entryFee}
        onChange={handleChange}
      />
    </div>
  );
};

export default ClubMeetingEntryFee;
