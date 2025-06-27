import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../button/Button';
import ClubModal from '../../modal/ClubModal';
import '../../../styles/club/detail/ClubMeetingItem.scss';

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
}

type ModalStep =
  | null
  | { type: 'attend'; phase: 'confirm' | 'complete' }
  | { type: 'cancel'; phase: 'confirm' | 'complete' };

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
}: ClubMeetingProps) => {
  const [modalStep, setModalStep] = useState<ModalStep>(null);
  const navigate = useNavigate();

  const handleClickModifyButton = () => {
    navigate(`/club/${clubId}/clubmeeting/edit`, { state: meetingId });
  };

  const handleTwoClick = (type: 'attend' | 'cancel') => {
    setModalStep({ type, phase: 'confirm' });
  };

  const handleConfirmClick = () => {
    if (!modalStep) return;

    if (modalStep.type === 'attend') {
      // TODO: 정기모임 참석 api 연동
    } else if (modalStep.type === 'cancel') {
      // TODO: 정기모임 취소 api 연동
    }
    setModalStep({ ...modalStep, phase: 'complete' });
  };

  const getModalProps = () => {
    if (!modalStep) return;

    if (modalStep.type === 'attend') {
      return {
        mainMessage:
          modalStep.phase === 'confirm'
            ? '참석하시겠습니까?'
            : '정상적으로 처리되었습니다.',
        showIcon: modalStep.phase === 'confirm',
        iconType: 'check',
      } as const;
    }

    if (modalStep.type === 'cancel') {
      return {
        mainMessage:
          modalStep.phase === 'confirm'
            ? '취소하시겠습니까?'
            : '정상적으로 처리되었습니다.',
        showIcon: modalStep.phase === 'confirm',
        iconType: 'warn',
      } as const;
    }
  };

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
              {/* TODO: 데이터 수정에 따라 디자인 gap 추가 요청 -> 필요 */}
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
            (loginUserRole === 'leader' || loginUserRole === 'manager') ? (
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
                    onClick={() => handleTwoClick('cancel')}
                  />
                ) : (
                  <Button
                    type="button"
                    className="club-meeting-button-apply"
                    title="참석"
                    onClick={() => handleTwoClick('attend')}
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
                      onClick={() => handleTwoClick('cancel')}
                    />
                  </>
                ) : /* 정기 모임 생성자가 아닐 경우 수정/삭제 권한 X, 정기 모임 참석 여부만 확인 */
                isApplied ? (
                  <Button
                    type="button"
                    className="club-meeting-button-cancel"
                    title="취소"
                    onClick={() => handleTwoClick('cancel')}
                  />
                ) : (
                  <Button
                    type="button"
                    className="club-meeting-button-apply"
                    title="참석"
                    onClick={() => handleTwoClick('attend')}
                  />
                )}
              </>
            )}
          </>
        ) : null}
      </div>

      {modalStep && (
        <ClubModal
          mainMessage={getModalProps().mainMessage}
          showIcon={getModalProps().showIcon}
          iconType={getModalProps().iconType}
          showCancelButton={modalStep.phase === 'confirm'}
          onConfirm={() => {
            if (modalStep.phase === 'confirm') {
              handleConfirmClick();
            } else {
              setModalStep(null);
            }
          }}
          onCancel={() => setModalStep(null)}
        />
      )}
    </div>
  );
};

export default ClubMeetingItem;
