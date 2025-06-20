import React, { useEffect, useRef, useState } from 'react';
import DatePicker from '../../../utils/DatePicker';

import Label from '../register/Label';
import useClubMeetingRegisterStore from '../../../store/club/useClubMeetingRegisterStore';
import '../../../styles/club/meeting_register/ClubMeetingDate.scss';

const ClubMeetingDate = () => {
  const datepickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isTouched, setIsTouched] = useState(false);
  const {
    clubMeetingDate,
    setClubMeetingDate,
    isClubMeetingDateValid,
    setIsClubMeetingDateValid,
    clubMeetingDateError,
    setClubMeetingDateError,
  } = useClubMeetingRegisterStore();

  useEffect(() => {
    if (datepickerRef.current) {
      new DatePicker(datepickerRef.current, {
        trigger: triggerRef.current,
        onSelect: date => {
          const selectedDate = new Date(date);

          setClubMeetingDate(
            `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
          );

          setIsClubMeetingDateValid(true);
          setClubMeetingDateError('');
          setIsTouched(true);
        },
      });

      triggerRef.current?.addEventListener('click', () => {
        setIsTouched(true);
      });
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        datepickerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !datepickerRef.current.contains(e.target as Node)
      ) {
        if (!clubMeetingDate) {
          setIsClubMeetingDateValid(false);
          setClubMeetingDateError('날짜를 선택해 주세요.');
        } else {
          setIsClubMeetingDateValid(true);
          setClubMeetingDateError('');
        }
      }
    };

    if (isTouched) document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [clubMeetingDate, isTouched]);

  const formatDateWithDay = (date: string): string => {
    if (!date) return '';
    const selectedDate = new Date(date);

    const yy = String(selectedDate.getFullYear()).slice(2);
    const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const dd = String(selectedDate.getDate()).padStart(2, '0');
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const day = days[selectedDate.getDay()];

    return `${yy}.${mm}.${dd} (${day})`;
  };

  return (
    <div className="club-meeting-date-wrapper">
      <Label labelTitle="날짜" isRequired />
      <div className="club-meeting-date-container" ref={triggerRef}>
        <div className="club-meeting-date-content-box">
          <div className="club-meeting-date-calendar-icon"></div>
          <div
            className={`club-meeting-date ${clubMeetingDate ? 'filled' : ''}`}
          >
            {formatDateWithDay(clubMeetingDate) || '날짜 선택'}
          </div>
        </div>
        <div className="club-meeting-date-dropdown-icon"></div>
      </div>
      <div className="datepicker-container" ref={datepickerRef} />
      {!isClubMeetingDateValid && (
        <div className="error">{clubMeetingDateError}</div>
      )}
    </div>
  );
};

export default ClubMeetingDate;
