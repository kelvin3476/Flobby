import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Main from '../../../api/main/Main';

import Button from '../../button/Button';
import ClubModal from '../../modal/ClubModal';

import '../../../styles/club/detail/ClubMeetingItem.scss';
import logger from '../../../utils/Logger';

interface ClubMeetingProps {
  meetingId: number; // 정기 모임 id
  loginMemberId: number; // 현재 로그인 유저의 id
  meetingLeaderId: number; // 정기 모임 생성자의 id
  clubMeetingTitle: string;
  clubMeetingDate: string;
  clubMeetingTime: string;
  clubMeetingLocation: string;
  maxParticipants: number;
  currentParticipants: number;
  isApplied: boolean;
  isMember: boolean; // 모임의 멤버인지 여부
  loginUserRole: string | null; // 현재 로그인 유저의 해당 모임에 대한 role
  entryfee: string;
  clubId: string; // 모임 id
  fetchClubDetail: () => Promise<void>;
}

const ClubMeetingItem = ({
  meetingId,
  loginMemberId,
  meetingLeaderId,
  clubMeetingTitle,
  clubMeetingDate,
  clubMeetingTime,
  clubMeetingLocation,
  maxParticipants,
  currentParticipants,
  isApplied,
  isMember,
  loginUserRole,
  entryfee,
  clubId,
  fetchClubDetail,
}: ClubMeetingProps) => {
  const [modalStep, setModalStep] = useState<null | 'confirm' | 'complete' | 'full'>(null);
  const [modalMode, setModalMode] = useState<null | 'attend' | 'cancel'>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickModifyButton = () => {
    navigate(`/club/${clubId}/clubmeeting/edit`, { state: meetingId });
  };

  const handleOpenModal = (mode: 'attend' | 'cancel') => {
    setModalMode(mode);
    setModalStep('confirm');
  };

  const handleModalConfirm = async () => {
    if (modalStep === 'confirm' && modalMode) {
      setIsLoading(true);
      try {
        if (modalMode === 'attend') {
          const response = await Main.participationClubMeeting(Number(meetingId));
          const { code, message } = response.data;
          if (code === 1000) {
            /* 정기 모임 참석 신청 후 성공 케이스 */
            setModalStep('complete');
          } else if (code === 1001) {
              if (message === "정원이 모두 찼어요.") {
                /* 동시성 이슈로 인해 모임 가입 신청 후 정원이 가득 찬 경우 */
                setModalStep('full');
              } else {
              /* TODO: 실패 케이스 모달 문구 및 연동 필요 (추후 작업이 필요함) */
            }
          }
        } else if (modalMode === 'cancel') {
            const response = await Main.cancelClubMeeting(Number(meetingId));
            const { code } = response.data;
            if (code === 1000) {
              /* 정기 모임 참석 취소 후 성공 케이스 */
              setModalStep('complete');
            } else {
            /* TODO: 실패 케이스 모달 문구 및 연동 필요 (추후 작업이 필요함) */
          }
        }
      } catch (error) {
        logger.error('정기 모임 참석/취소 중 오류 발생:', error);
        setModalStep(null);
        setModalMode(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleModalClose = async() => {
    setModalStep(null);
    setModalMode(null);
    await fetchClubDetail();
  };

  const getModalProps = () => {
    if (!modalStep || !modalMode) return null;
    if (modalStep === 'confirm') {
      return {
        mainMessage: modalMode === 'attend'
          ? '참석하시겠습니까?'
          : '취소하시겠습니까?',
        showIcon: true,
        iconType: (modalMode === 'attend' ? 'check' : 'warn') as 'check' | 'warn',
        showCancelButton: true,
      };
    }
    if (modalStep === 'complete') {
      return {
        mainMessage:'정상적으로 처리되었습니다.',
        showIcon: false,
        iconType: 'check' as const,
        showcancelButton: false,
      };
    }
    if (modalStep === 'full') {
      return {
        mainMessage: '정원이 모두 찼어요.',
        subMessage: '자리가 생기면 알림을 보내드릴까요?',
        showIcon: true,
        iconType: 'warn' as const,
        showCancelButton: true,
        confirmText: '알림 받기',
        cancelText: '닫기',
      };
    }
    return null;
  };

  const modalProps = getModalProps();

  return (
    <div className="club-meeting-item-container">
      {/* 내용 영역 */}
      <div className="club-meeting-item-content-box">
        <div className="club-meeting-item-title-box">
          <span>{clubMeetingTitle}</span>
        </div>
        <div className="club-meeting-item-info-box">
          {/* 정기모임 일시 */}
          <div className="club-meeting-date-box">
            <div className="club-meeting-date-icon"></div>
            <div className="club-meeting-date">
              <span>{clubMeetingDate}</span>
              <span>{clubMeetingTime}</span>
            </div>
          </div>

          <span className="club-meeting-item-divider-icon"></span>

          {/* 정기모임 장소 */}
          <div className="club-meeting-location-box">
            <div className="club-meeting-location-icon"></div>
            <div className="club-meeting-location">{clubMeetingLocation}</div>
          </div>

          <span className="club-meeting-item-divider-icon"></span>

          {/* 정기모임 인원 */}
          <div className="club-meeting-participant-box">
            <div className="club-meeting-participant-icon"></div>
            <div className="club-meeting-participant">
              <div className="club-meeting-participant-num">
                <span className="club-meeting-current-participant">
                  {currentParticipants}
                </span>
                <span>/</span>
                <span>{maxParticipants}</span>
              </div>
              <span>명</span>
            </div>
          </div>

          <span className="club-meeting-item-divider-icon"></span>

          {/* 참가비 */}
          <div className="club-meeting-participationFee-box">
            <div className="club-meeting-participationFee-icon"></div>
            <div className="club-meeting-participationFee">
              <span>{entryfee}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="club-meeting-button-box">
        {/* 모임 가입자만 버튼 제공, 미가입자는 버튼 제공 x */}
        {isMember ? (
          /* 모임장 & 운영진, 일반 사용자 두 가지 케이스로 분기 */
          <>
            {/* 모임장 & 운영진일 경우 정기 모임 수정/삭제 권한 O */}
            {loginUserRole &&
            (loginUserRole === 'LEADER' || loginUserRole === 'MANAGER') ? (
              <>
                <Button
                  type="button"
                  className="club-meeting-button-modify"
                  title="수정"
                  onClick={handleClickModifyButton}
                />
                {/* 정기 모임 참석 여부 확인 */}
                {isApplied ? (
                  <Button
                    type="button"
                    className="club-meeting-button-cancel"
                    title="취소"
                    onClick={() => handleOpenModal('cancel')}
                  />
                ) : (
                  <Button
                    type="button"
                    className="club-meeting-button-apply"
                    title="참석"
                    onClick={() => handleOpenModal('attend')}
                  />
                )}
              </>
            ) : (
              <>
                {/* 일반 사용자의 경우 정기 모임 생성자 일 때, 생성자가 아닐 때로 분기*/}
                {/* 정기 모임 생성자는 정기 모임 수정/삭제 권한 O, 참석이 default -> 취소 버튼 노출*/}
                {loginMemberId === meetingLeaderId ? (
                  <>
                    <Button
                      type="button"
                      className="club-meeting-button-modify"
                      title="수정"
                      onClick={handleClickModifyButton}
                    />
                    <Button
                      type="button"
                      className="club-meeting-button-cancel"
                      title="취소"
                      onClick={() => handleOpenModal('cancel')}
                    />
                  </>
                ) : /* 정기 모임 생성자가 아닐 경우 수정/삭제 권한 X, 정기 모임 참석 여부만 확인 */
                isApplied ? (
                  <Button
                    type="button"
                    className="club-meeting-button-cancel"
                    title="취소"
                    onClick={() => handleOpenModal('cancel')}
                  />
                ) : (
                  <Button
                    type="button"
                    className="club-meeting-button-apply"
                    title="참석"
                    onClick={() => handleOpenModal('attend')}
                  />
                )}
              </>
            )}
          </>
        ) : null}
      </div>

      {modalStep === 'confirm' && modalProps && (
        <ClubModal
          {...modalProps}
          onConfirm={handleModalConfirm}
          onCancel={() => {
            setModalMode(null);
            setModalStep(null);
          }}
        />
      )}

      {(modalStep === 'complete' || modalStep === 'full') && modalProps && (
        <ClubModal
          {...modalProps}
          onConfirm={handleModalClose}
          onCancel={() => {
            setModalStep(null);
            setModalMode(null);
          }}
        />
      )}
    </div>
  );
};

export default ClubMeetingItem;