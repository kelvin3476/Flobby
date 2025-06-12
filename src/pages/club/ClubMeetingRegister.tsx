import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Title from '../../components/club/text/Title';
import ClubModal from '../../components/modal/ClubModal';
import MainHeader from '../../components/header/MainHeader';

import ClubMeetingTitle from '../../components/club/meetingRegister/ClubMeetingTitle';
import ClubMeetingDate from '../../components/club/meetingRegister/ClubMeetingDate';
import ClubMeetingTime from '../../components/club/meetingRegister/ClubMeetingTime';
import ClubMeetingLocation from '../../components/club/meetingRegister/ClubMeetingLocation';
import ClubMeetingMember from '../../components/club/meetingRegister/ClubMeetingMember';
import ClubMeetingEntryFee from '../../components/club/meetingRegister/ClubMeetingEntryFee';

import useClubMeetingRegisterStore from '../../store/club/useClubMeetingRegisterStore';
import useMainPage from '../../hooks/main/useMainPage';

import { CreateClubMeetingData } from '../../api/ApiTypes';
import { ClubController } from '../../services/club/controllers/ClubController';

import '../../styles/club/meeting_register/ClubMeetingRegister.scss';

const ClubMeetingRegister = () => {
  const {
    clubMeetingTitle,
    clubMeetingDate,
    clubMeetingTime,
    clubMeetingLocation,
    maxParticipants,
    entryFee,
    setIsClubMeetingTitleValid,
    setClubMeetingTitleError,
    setIsClubMeetingDateValid,
    setClubMeetingDateError,
    setIsClubMeetingTimeValid,
    setClubMeetingTimeError,
    setIsClubMeetingLocationValid,
    setClubMeetingLocationError,
    setIsMaxParticipantsValid,
    setMaxParticipantsError,
  } = useClubMeetingRegisterStore();

  const { clubId } = useParams<{ clubId: string }>();
  const nav = useNavigate();

  const [modalStep, setModalStep] = useState<null | 1 | 2>(null);

  const { accessToken, mainDataList, setMainDataList } = useMainPage();

  const clubController = ClubController.getInstance();

  const handleValidChange = () => {
    let isError = false;

    // 정기 모임명 유효성 검사
    if (!clubMeetingTitle) {
      setIsClubMeetingTitleValid(false);
      setClubMeetingTitleError("제목을 입력해 주세요.");
      isError = true;
    } else {
      setIsClubMeetingTitleValid(true);
      setClubMeetingTitleError("");
    }

    // 날짜 유효성 검사
    if (!clubMeetingDate) {
      setIsClubMeetingDateValid(false);
      setClubMeetingDateError("날짜를 선택해 주세요.");
      isError = true;
    } else {
      setIsClubMeetingDateValid(true);
      setClubMeetingDateError("");
    }

    // 시간 유효성 검사
    if (!clubMeetingTime) {
      setIsClubMeetingTimeValid(false);
      setClubMeetingTimeError("시간을 선택해 주세요.");
      isError = true;
    } else {
      setIsClubMeetingTimeValid(true);
      setClubMeetingTimeError("");
    }

    // 장소 유효성 검사
    if (!clubMeetingLocation) {
      setIsClubMeetingLocationValid(false);
      setClubMeetingLocationError("장소를 입력해 주세요.");
      isError = true;
    } else {
      setIsClubMeetingLocationValid(true);
      setClubMeetingLocationError("");
    }

    // 모집 인원 유효성 검사
    if (!maxParticipants) {
      setIsMaxParticipantsValid(false);
      setMaxParticipantsError("인원 수를 입력해 주세요.");
      isError = true;
    } else {
      setIsMaxParticipantsValid(true);
      setMaxParticipantsError("");
    }

    if (isError) return;

    setModalStep(1);
  };

  const formattedDate = (input: string): string => {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formattedTime = (input: string): string => {
    return input.replace('분', '').trim();
  };

  const handleSubmitClubMeetingForm = async () => {
    if (!clubId) {
      console.error("clubId가 없습니다.");
      return;
    }

    const formattedDateTo = formattedDate(clubMeetingDate);
    const formattedTimeTo = formattedTime(clubMeetingTime);

    const payload: CreateClubMeetingData = {
      clubMeetingTitle,
      clubMeetingDate: formattedDateTo,
      clubMeetingTime: formattedTimeTo,
      clubMeetingLocation,
      maxParticipants,
      ...(entryFee && { entryFee }),
    }

    try {
      await clubController.createClubMeeting(payload, Number(clubId));
    } catch (error) {
      console.error('정기 모임 등록 요청 실패:', error);
    }
  }

  return (
    <div className="club-meeting-register-container">
      <MainHeader accessToken={accessToken} mainDataList={mainDataList} setMainDataList={setMainDataList} />
      <div className="club-meeting-register-wrapper">
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
              <button type="button" className="club-meeting-register-cancel" onClick={() => nav(`/club/${clubId}`)}>
                취소
              </button>
              <button type="button" className="club-meeting-register-submit" onClick={handleValidChange}>
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer>
        {/* 추후 footer 추가 */}
      </footer>

      {modalStep && (
        <ClubModal 
          message={modalStep === 1 ? "정기 모임을 등록할까요?" : "정기 모임이 등록되었어요."}
          showIcon={modalStep === 1}
          showCancelButton={modalStep === 1}
          onConfirm={async () => {
            if (modalStep === 1) {
              setModalStep(2);
            } else {
              setModalStep(null);
              await handleSubmitClubMeetingForm();
              nav('/club/list/register')
            }
          }}
          onCancel={() => setModalStep(null)}
        />
      )}
    </div>
  );
};

export default ClubMeetingRegister;
