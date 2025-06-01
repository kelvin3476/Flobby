import React from 'react';
import Button from '../../button/Button';
import '../../../styles/club/clubItem/ClubMeetingItem.scss';

interface ClubMeetingProps {
  loginMemberId: number;
  meetingLeaderId: number;
  clubMeetingTitle: string;
  clubMeetingDate: string;
  clubMeetingLocation: string;
  maxParticipants: number;
  currentParticipants: number;
  isApplied: boolean;
  isMember: boolean;
  role: string;
}
const ClubMeetingItem = ({
  loginMemberId,
  meetingLeaderId,
  clubMeetingTitle,
  clubMeetingDate,
  clubMeetingLocation,
  maxParticipants,
  currentParticipants,
  isApplied,
  isMember,
  role,
}: ClubMeetingProps) => {
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
              {/* TODO: 참가비 단순 스트링값 디자인 수정 필요 */}
              <span className="club-meeting-participationFee-num">N</span>
              <span>/</span>
              <span>1</span>
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="club-meeting-button-box">
        {/* 모임 가입 여부 */}
        {/* 미가입자는 버튼 제공 x */}
        {isMember ? (
          <>
            {/* 모임장 & 운영진일 경우 정기 모임 수정/삭제 권한 O */}
            {role === 'leader' || role === 'manager' ? (
              <>
                <Button
                  type="button"
                  className="club-meeting-button-modify"
                  title="수정"
                  onClick={() => {}}
                />
                {/* 참석 여부 확인 */}
                {isApplied ? (
                  <Button
                    type="button"
                    className="club-meeting-button-cancel"
                    title="취소"
                    onClick={() => {}}
                  />
                ) : (
                  <Button
                    type="button"
                    className="club-meeting-button-apply"
                    title="참석"
                    onClick={() => {}}
                  />
                )}
              </>
            ) : (
              <>
                {/* 일반 사용자의 경우 */}
                {/* 정기 모임 생성자는 정기 모임 수정/삭제 권한 O, 참석이 default */}
                {loginMemberId === meetingLeaderId ? (
                  <>
                    <Button
                      type="button"
                      className="club-meeting-button-modify"
                      title="수정"
                      onClick={() => {}}
                    />
                    <Button
                      type="button"
                      className="club-meeting-button-cancel"
                      title="취소"
                      onClick={() => {}}
                    />
                  </>
                ) : isApplied ? (
                  /* 정기 모임 생성자가 아닐 경우 수정/삭제 권한 X, 참석 여부 확인 */
                  <Button
                    type="button"
                    className="club-meeting-button-cancel"
                    title="취소"
                    onClick={() => {}}
                  />
                ) : (
                  <Button
                    type="button"
                    className="club-meeting-button-apply"
                    title="참석"
                    onClick={() => {}}
                  />
                )}
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ClubMeetingItem;
