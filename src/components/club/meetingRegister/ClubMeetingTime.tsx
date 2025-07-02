import React, { useEffect, useState } from 'react';
import Label from '../register/Label';
import DropDown from '../../dropdown/Dropdown';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';

import '../../../styles/club/meeting_register/ClubMeetingTime.scss';

interface ClubMeetingTimeProps {
  isEditPage: boolean;
}

const ClubMeetingTime = ({ isEditPage }: ClubMeetingTimeProps) => {
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
      const hour = parseInt(time);
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

  // 시간 형식 "14:15" -> 14 -> 2로 변환 필요
  const reconvertedHour = (time: string): { time: number; minute: string } => {
    const [hh, mm] = time.split(':');

    const hour = Number(hh);

    let formatHour = 0;
    if (hour === 0 || hour === 12) {
      formatHour = 12;
    } else {
      formatHour = hour % 12;
    }

    return { time: formatHour, minute: mm };
  };

  useEffect(() => {
    if (isEditPage && clubMeetingTime) {
      setTime(String(reconvertedHour(clubMeetingTime).time));
      setMinute(String(reconvertedHour(clubMeetingTime).minute));
    }
  }, [isEditPage, clubMeetingTime]);

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
          defaultItem={isEditPage && time + '시'}
          disabled={false}
          placeholder="시 선택"
          onSelect={setTime}
        />
        <DropDown
          options={minutes.map(minute => minute + '분')}
          defaultItem={isEditPage && minute + '분'}
          disabled={false}
          placeholder="분 선택"
          onSelect={selectedMinute => {
            setMinute(selectedMinute.replace('분', ''));
          }}
        />
      </div>
      {!isClubMeetingTimeValid && (
        <div className="error">{clubMeetingTimeError}</div>
      )}
    </div>
  );
};

export default ClubMeetingTime;
