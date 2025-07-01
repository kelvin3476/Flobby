import React, { useEffect, useState } from 'react';
import Label from '../register/Label';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

interface ClubMeetingEntryFeeProps {
  isEditPage: boolean;
}

const ClubMeetingEntryFee = ({ isEditPage }: ClubMeetingEntryFeeProps) => {
  const { entryFee, setEntryFee } = useClubMeetingRegisterStore();

  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setEntryFee(value);
  };

  useEffect(() => {
    if (isEditPage && entryFee) setInputValue(entryFee);
  }, [entryFee]);

  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="참가비" htmlFor="club-meeting-entryfee" />
      <input
        id="club-meeting-entryfee"
        type="text"
        placeholder="참가비를 입력해 주세요."
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default ClubMeetingEntryFee;
