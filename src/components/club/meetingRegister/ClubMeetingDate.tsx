import React, { useEffect, useRef, useState } from 'react';
import DatePicker from '@/utils/DatePicker';

import Label from '@/components/club/register/Label';
import useClubMeetingRegisterStore from '@/store/club/useClubMeetingRegisterStore';
import '@/styles/club/meeting_register/ClubMeetingDate.scss';

interface ClubMeetingDateProps {
  isEditPage: boolean;
}

const ClubMeetingDate = ({ isEditPage }: ClubMeetingDateProps) => {
  const datepickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const datePickerInstance = useRef<DatePicker | null>(null);
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const {
    clubMeetingDate,
    setClubMeetingDate,
    isClubMeetingDateValid,
    setIsClubMeetingDateValid,
    clubMeetingDateError,
    setClubMeetingDateError,
  } = useClubMeetingRegisterStore();

  const [date, setDate] = useState<string>('');

  useEffect(() => {
    if (datepickerRef.current && triggerRef.current) {
      datePickerInstance.current = new DatePicker(datepickerRef.current, {
        trigger: triggerRef.current,
        initialDate: null,
        onSelect: date => {
          const selectedDate = new Date(date);

          setClubMeetingDate(
            `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`,
          );
          setDate(formatDateWithDay(String(selectedDate)));

          setIsClubMeetingDateValid(true);
          setClubMeetingDateError('');
        },
      });
    }

    if (triggerRef.current) {
      const handleClick = () => setIsTouched(true);

      triggerRef.current.addEventListener('click', handleClick);

      return () => {
        triggerRef.current?.removeEventListener('click', handleClick);
      };
    }
  }, []);

  // 수정페이지: 데이트 피커 초기값 업데이트 로직
  useEffect(() => {
    if (isEditPage && datePickerInstance.current && clubMeetingDate) {
      const initialDate = parseDateString(clubMeetingDate);
      if (initialDate) {
        datePickerInstance.current.setInitialDate(initialDate);
        setDate(formatDateWithDay(clubMeetingDate));
      }
    }
  }, [clubMeetingDate, isEditPage]);

  // 외부 클릭시 유효성 검사
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

  // clubMeetingDate: "2025-07-11" 형식 Date 객체로 변환하는 함수
  const parseDateString = (dateStr: string): Date | null => {
    if (!dateStr) return null;

    const [yyyy, mm, dd] = dateStr.split('-');

    const year = Number(yyyy);
    const month = Number(mm) - 1;
    const day = Number(dd);

    return new Date(year, month, day);
  };

  return (
    <div className="club-meeting-date-wrapper">
      <Label labelTitle="날짜" isRequired />
      <div className="club-meeting-date-container" ref={triggerRef}>
        <div className="club-meeting-date-content-box">
          <div className="club-meeting-date-calendar-icon"></div>
          <div className={`club-meeting-date ${date ? 'filled' : ''}`}>
            {date || '날짜 선택'}
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
