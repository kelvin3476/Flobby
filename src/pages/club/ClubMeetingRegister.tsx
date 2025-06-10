import React, { useEffect, useRef, useState } from 'react';
import DatePicker from '../../utils/DatePicker';

import '../../styles/datepicker/DatePicker.scss';

const ClubMeetingRegister = () => {
  const datepickerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (datepickerRef.current) {
      new DatePicker(datepickerRef.current, {
        trigger: triggerRef.current,
        onSelect: date => {
          console.log(date);
          /* TODO: 선택된 날짜를 데이터 형식에 맞게 가공 후 전역에 저장 */
        },
      });
    }
  }, []);

  return (
    <div>
      {/* TODO: 날짜 선택 => 퍼블 필요 */}
      <div ref={triggerRef}>날짜 선택</div>
      <div className="datepicker-container" ref={datepickerRef} />
    </div>
  );
};

export default ClubMeetingRegister;
