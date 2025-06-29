import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

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

import { ClubMeetingData } from '../../api/ApiTypes';
import { ClubController } from '../../services/club/controllers/ClubController';

import '../../styles/club/meeting_register/ClubMeetingRegister.scss';
import logger from '../../utils/Logger';

const ClubMeetingRegister = () => {
  const {
    clubMeetingTitle,
    clubMeetingDate,
    clubMeetingTime,
    clubMeetingLocation,
    maxParticipants,
    entryFee,
    setClubMeetingTitle,
    setIsClubMeetingTitleValid,
    setClubMeetingTitleError,
    setClubMeetingDate,
    setIsClubMeetingDateValid,
    setClubMeetingDateError,
    setClubMeetingTime,
    setIsClubMeetingTimeValid,
    setClubMeetingTimeError,
    setClubMeetingTimeMeridiem,
    setClubMeetingLocation,
    setIsClubMeetingLocationValid,
    setClubMeetingLocationError,
    setMaxParticipants,
    setIsMaxParticipantsValid,
    setMaxParticipantsError,
    setEntryFee,
  } = useClubMeetingRegisterStore();

  const { clubId } = useParams<{ clubId: string }>();
  const nav = useNavigate();
  const loc = useLocation();
  const meetingId = loc.state;

  const [modalStep, setModalStep] = useState<
    null | 'warn' | 'confirm' | 'complete'
  >(null);
  const [buttonType, setButtonType] = useState<null | 'register' | 'delete'>(
    null,
  );

  const { accessToken } = useMainPage();

  const clubController = ClubController.getInstance();

  /* 정기 모임 등록 페이지 최초 진입 시 스크롤 최상단 고정 */
  React.useEffect(() => {
    /* 정기 모임 등록 상태 관리 초기화 */
    setClubMeetingTitle('');
    setIsClubMeetingTitleValid(true);
    setClubMeetingTitleError('');
    setClubMeetingDate('');
    setIsClubMeetingDateValid(true);
    setClubMeetingDateError('');
    setClubMeetingTime('');
    setIsClubMeetingTimeValid(true);
    setClubMeetingTimeError('');
    setClubMeetingLocation('');
    setIsClubMeetingLocationValid(true);
    setClubMeetingLocationError('');
    setMaxParticipants(0);
    setIsMaxParticipantsValid(true);
    setMaxParticipantsError('');
    setEntryFee('');

    window.scrollTo(0, 0);
  }, []);

  const handleValidChange = () => {
    let isError = false;

    // 정기 모임명 유효성 검사
    if (!clubMeetingTitle) {
      setIsClubMeetingTitleValid(false);
      setClubMeetingTitleError('제목을 입력해 주세요.');
      isError = true;
    } else {
      setIsClubMeetingTitleValid(true);
      setClubMeetingTitleError('');
    }

    // 날짜 유효성 검사
    if (!clubMeetingDate) {
      setIsClubMeetingDateValid(false);
      setClubMeetingDateError('날짜를 선택해 주세요.');
      isError = true;
    } else {
      setIsClubMeetingDateValid(true);
      setClubMeetingDateError('');
    }

    // 시간 유효성 검사
    if (!clubMeetingTime) {
      setIsClubMeetingTimeValid(false);
      setClubMeetingTimeError('시간을 선택해 주세요.');
      isError = true;
    } else {
      setIsClubMeetingTimeValid(true);
      setClubMeetingTimeError('');
    }

    // 장소 유효성 검사
    if (!clubMeetingLocation) {
      setIsClubMeetingLocationValid(false);
      setClubMeetingLocationError('장소를 입력해 주세요.');
      isError = true;
    } else {
      setIsClubMeetingLocationValid(true);
      setClubMeetingLocationError('');
    }

    // 모집 인원 유효성 검사
    if (!maxParticipants) {
      setIsMaxParticipantsValid(false);
      setMaxParticipantsError('인원 수를 입력해 주세요.');
      isError = true;
    } else {
      setIsMaxParticipantsValid(true);
      setMaxParticipantsError('');
    }

    if (isError) return;

    setButtonType('register');
    setModalStep('confirm');
  };

  // 날짜 형식 변환 (-> "2025-07-11")
  const formattedDate = (input: string): string => {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 시간 형식 변환
  const formattedTime = (input: string): string => {
    return input.replace('분', '').trim();
  };

  // 정기 모임 등록
  const handleSubmitClubMeetingForm = async () => {
    if (!clubId) {
      console.error('clubId가 없습니다.');
      return;
    }

    const formattedDateTo = formattedDate(clubMeetingDate);
    const formattedTimeTo = formattedTime(clubMeetingTime);

    const payload: ClubMeetingData = {
      clubMeetingTitle,
      clubMeetingDate: formattedDateTo,
      clubMeetingTime: formattedTimeTo,
      clubMeetingLocation,
      maxParticipants,
      entryfee: entryFee,
    };

    try {
      await clubController.createClubMeeting(payload, Number(clubId));
    } catch (error) {
      console.error('정기 모임 등록 요청 실패:', error);
    }
  };

  /* ---------------- */
  /* 모임 수정 페이지 로직 */
  /* ---------------- */

  // 정기모임 페이지 확인값
  const isEditPage = window.location.pathname.startsWith(
    `/club/${clubId}/clubmeeting/edit`,
  );

  // 정기 모임 수정
  const handleEditClubMeetingForm = async () => {
    if (!meetingId) {
      console.error('meetingId가 없습니다.');
      return;
    }

    const formattedDateTo = formattedDate(clubMeetingDate);
    const formattedTimeTo = formattedTime(clubMeetingTime);

    const payload: ClubMeetingData = {
      clubMeetingTitle,
      clubMeetingDate: formattedDateTo,
      clubMeetingTime: formattedTimeTo,
      clubMeetingLocation,
      maxParticipants,
      entryfee: entryFee,
    };

    try {
      await clubController.editClubMeeting(payload, meetingId);
    } catch (error) {
      console.error('정기 모임 수정 요청 실패:', error);
    }
  };

  useEffect(() => {
    if (isEditPage) {
      try {
        const fetchClubMeetingItemData = async () => {
          const data = await clubController.selectClubDetail(Number(clubId));

          const selectedClubMeeting = data.clubMeetingList.find(
            item => item.meetingId === meetingId,
          );

          if (!selectedClubMeeting) {
            logger.error('해당 meetingId에 맞는 모임을 찾을 수 없습니다.');
            return;
          }

          // 시간 형식 변환(응답값 -> 요청값)
          const { time, meridiem } = reformattedTime(
            selectedClubMeeting.clubMeetingTime,
          );

          setClubMeetingTitle(selectedClubMeeting.clubMeetingTitle);
          setIsClubMeetingTitleValid(true);
          setClubMeetingTitleError('');
          setClubMeetingDate(
            reformattedDate(selectedClubMeeting.clubMeetingDate),
          );
          setIsClubMeetingDateValid(true);
          setClubMeetingDateError('');
          setClubMeetingTime(time);
          setClubMeetingTimeMeridiem(meridiem);
          setIsClubMeetingTimeValid(true);
          setClubMeetingTimeError('');
          setClubMeetingLocation(selectedClubMeeting.clubMeetingLocation);
          setIsClubMeetingLocationValid(true);
          setClubMeetingLocationError('');
          setMaxParticipants(selectedClubMeeting.maxParticipants);
          setIsMaxParticipantsValid(true);
          setMaxParticipantsError('');
          setEntryFee(selectedClubMeeting.entryfee);
        };

        fetchClubMeetingItemData();
      } catch (error) {
        logger.error('ClubMeetingRegister', error);
      }
    }
  }, [clubId, meetingId, isEditPage]);

  // 요청값 "2025-07-11"
  // 응답값 "25.06.27 (금)" -> 요일 제거 & 형식 맞춰 다시 형식 변환하여 저장
  const reformattedDate = (date: string): string => {
    const [yy, mm, dd] = date.split(' ')[0].split('.');
    return `20${yy}-${mm}-${dd}`;
  };

  // 요청값 "06:00"
  // 응답값 "오전 06:00" -> meridiem, time으로 구분
  const reformattedTime = (
    time: string,
  ): { time: string; meridiem: string } => {
    const [meridiem, timeStr] = time.split(' ');
    let [hh, mm] = timeStr.split(':').map(Number);
    if (meridiem === '오전' && hh === 12) hh = 0;
    if (meridiem === '오후' && hh !== 12) hh += 12;
    const reformattedTime = `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;

    return { time: reformattedTime, meridiem };
  };

  /* 정기 모임 삭제 */
  const handleDeleteClubMeeting = async () => {
    if (!meetingId) {
      console.error('meetingId가 없습니다.');
      return;
    }

    try {
      await clubController.deleteClubMeeting(Number(meetingId));
    } catch (error) {
      console.error('모임 삭제 요청 실패', error);
    }
  };

  // 모달 이벤트 핸들러 함수
  const handleModalConfirm = async () => {
    if (modalStep === 'confirm') {
      if (isEditPage) {
        await handleEditClubMeetingForm();
      } else {
        await handleSubmitClubMeetingForm();
      }
      setModalStep('complete');
    } else if (modalStep === 'warn') {
      await handleDeleteClubMeeting();
      setModalStep('complete');
    } else {
      setModalStep(null);
      nav(`/club/${clubId}`);
    }
  };

  /* 모달 메세지 */
  const MESSAGES = {
    confirm: {
      edit: '정기 모임을 수정하시겠습니까?',
      create: '정기 모임을 등록할까요?',
      delete: '모임을 삭제하시겠습니까?',
    },
    done: {
      edit: '정기 모임이 수정되었어요.',
      create: '정기 모임이 등록되었어요.',
      delete: '정상적으로 처리되었어요.',
    },
  };

  const handleModalMessages = (buttonType: 'register' | 'delete') => {
    if (buttonType === 'register') {
      // 등록 버튼
      if (isEditPage) {
        if (modalStep === 'confirm') {
          return MESSAGES.confirm.edit;
        } else {
          return MESSAGES.done.edit;
        }
      } else {
        if (modalStep === 'confirm') {
          return MESSAGES.confirm.create;
        } else {
          return MESSAGES.done.create;
        }
      }
    } else if (buttonType === 'delete') {
      // 삭제 버튼
      if (modalStep === 'warn') {
        return MESSAGES.confirm.delete;
      } else {
        return MESSAGES.done.delete;
      }
    }
  };

  return (
    <div className="club-meeting-register-container">
      <MainHeader accessToken={accessToken} />

      <div className="club-meeting-register-wrapper">
        <Title
          titleName={isEditPage ? '정기 모임 수정' : '정기 모임 등록'}
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
              <ClubMeetingDate isEditPage={isEditPage} />
              <ClubMeetingTime isEditPage={isEditPage} />
              <ClubMeetingLocation />
              <ClubMeetingMember />
              <ClubMeetingEntryFee />
            </div>

            {/* 버튼 */}
            <div className="club-meeting-register-button-container">
              <div className="left-wrapper">
                {isEditPage ? (
                  <button
                    type="button"
                    className="club-meeting-delete-btn"
                    onClick={() => {
                      setButtonType('delete');
                      setModalStep('warn');
                    }}
                  >
                    삭제
                  </button>
                ) : (
                  <></>
                )}
              </div>
              <div className="right-wrapper">
                <button
                  type="button"
                  className="club-meeting-register-cancel-btn"
                  onClick={() => nav(`/club/${clubId}`)}
                >
                  취소
                </button>
                <button
                  type="button"
                  className="club-meeting-register-submit-btn"
                  onClick={handleValidChange}
                >
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>{/* 추후 footer 추가 */}</footer>

      {modalStep && (
        <ClubModal
          mainMessage={handleModalMessages(buttonType)}
          showIcon={modalStep === 'confirm' || modalStep === 'warn'}
          iconType={modalStep === 'warn' ? 'warn' : 'check'}
          showCancelButton={modalStep === 'confirm' || modalStep === 'warn'}
          onConfirm={handleModalConfirm}
          onCancel={() => setModalStep(null)}
        />
      )}
    </div>
  );
};

export default ClubMeetingRegister;
