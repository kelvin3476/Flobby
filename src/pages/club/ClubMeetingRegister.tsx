import React, { useEffect, useRef, useState } from 'react';

import ClubMeetingDate from '../../components/club/meetingRegister/ClubMeetingDate';
import Title from '../../components/club/text/Title';

import ClubMeetingTitle from '../../components/club/meetingRegister/ClubMeetingTitle';
import ClubMeetingTime from '../../components/club/meetingRegister/ClubMeetingTime';
import ClubMeetingLocation from '../../components/club/meetingRegister/clubMeetingLocation';
import ClubMeetingMember from '../../components/club/meetingRegister/ClubMeetingMember';
import ClubMeetingEntryFee from '../../components/club/meetingRegister/ClubMeetingEntryFee';

import '../../styles/club/meeting_register/ClubMeetingRegister.scss';

const ClubMeetingRegister = () => {
  return (
    <div className="club-meeting-register-container">
      <Title
        titleName="정기 모임 등록"
        className="club-meeting-register-title"
      />

      <div className="club-meeting-register-content-wrapper">
        <div className="club-meeting-register-line-box">
          <div>
            <span>*</span>
            <span>필수 입력 사항</span>
          </div>
          <div className="line"></div>
        </div>
        <div className="club-meeting-register-content-area">
          <div className="club-meeting-register-content">
            <ClubMeetingTitle />
            <ClubMeetingDate />
            <ClubMeetingTime />
            <ClubMeetingLocation />
            <ClubMeetingMember />
            <ClubMeetingEntryFee />
          </div>
          <div className="club-meeting-register-button-container">
            <button type="button" className="club-meeting-register-cancel">
              취소
            </button>
            <button type="button" className="club-meeting-register-submit">
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubMeetingRegister;
