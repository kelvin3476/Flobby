import React, { useEffect, useState } from 'react';
import Label from '../register/Label';
import DropDown from '../../dropdown/Dropdown';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

import '../../../styles/club/meeting_register/ClubMeetingTime.scss';

const ClubMeetingTime = () => {
  const [activeButton, setActiveButton] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [minute, setMinute] = useState<string>('');

  const {
    clubMeetingTime,
    setClubMeetingTime,
    isClubMeetingTimeValid,
    setIsClubMeetingTimeValid,
    clubMeetingTimeError,
    setClubMeetingTimeError,
    clubMeetingTimeMeridiem,
  } = useClubMeetingRegisterStore();

  const times = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes = ['00', '15', '30', '45'];

  useEffect(() => {
    if (activeButton && time && minute) {
      const hour = parseInt(time); // 1~12
      const convertedHour =
        activeButton === 'night'
          ? hour === 12
            ? 12
            : hour + 12
          : hour === 12
            ? 0
            : hour;
      const formattedHour = String(convertedHour).padStart(2, '0');
      const formattedTime = `${formattedHour}:${minute}`;

      setClubMeetingTime(formattedTime);
      setIsClubMeetingTimeValid(true);
      setClubMeetingTimeError('');
    }
  }, [activeButton, time, minute]);

  // 수정 페이지 오전/오후 상태 업데이트
  useEffect(() => {
    clubMeetingTimeMeridiem === '오전'
      ? setActiveButton('day')
      : setActiveButton('night');
  }, [clubMeetingTimeMeridiem]);

  return (
    <div className="club-meeting-content-container">
      <Label labelTitle="시간" isRequired />
      <div className="club-meeting-time-switch-box">
        <div
          className={`time-switch-button ${activeButton === 'day' ? 'active' : ''}`}
          onClick={() => setActiveButton('day')}
        >
          오전
        </div>
        <div
          className={`time-switch-button ${activeButton === 'night' ? 'active' : ''}`}
          onClick={() => setActiveButton('night')}
        >
          오후
        </div>
      </div>

      <div className="club-meeting-dropdown-box">
        <DropDown
          options={times.map(time => time + '시')}
          defaultItem={clubMeetingTime.split(':')[0]}
          disabled={false}
          placeholder="시 선택"
          onSelect={setTime}
        />
        <DropDown
          options={minutes.map(minute => minute + '분')}
          defaultItem={clubMeetingTime.split(':')[1]}
          disabled={false}
          placeholder="분 선택"
          onSelect={setMinute}
        />
      </div>
      {!isClubMeetingTimeValid && (
        <div className="error">{clubMeetingTimeError}</div>
      )}
    </div>
  );
};

export default ClubMeetingTime;
