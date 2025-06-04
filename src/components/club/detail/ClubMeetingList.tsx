import React from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../text/Title';
import ClubMeetingItem from './ClubMeetingItem';
import Button from '../../button/Button';
import { ClubMeetingListItem } from '../../../api/ApiTypes';
import '../../../styles/club/detail/ClubMeetingList.scss';

interface ClubMeetingListProps {
  clubMeetingList: ClubMeetingListItem[];
  loginMemberId: number;
  role: string;
  isMember: boolean;
  clubId: string;
}
const ClubMeetingList = ({
  clubMeetingList,
  loginMemberId,
  role,
  isMember,
  clubId,
}: ClubMeetingListProps) => {
  const navigate = useNavigate();

  return (
    <div className="club-meeting-list-container">
      <Title className="club-detail-item-sub-title" titleName="정기 모임" />
      <div className="club-meeting-list">
        {clubMeetingList.length > 0 ? (
          clubMeetingList.map(clubMeetingItem => (
            <ClubMeetingItem
              key={clubMeetingItem.meetingId}
              clubMeetingTitle={clubMeetingItem.clubMeetingTitle}
              clubMeetingDate={clubMeetingItem.clubMeetingDate}
              clubMeetingLocation={clubMeetingItem.clubMeetingLocation}
              maxParticipants={clubMeetingItem.maxParticipants}
              currentParticipants={clubMeetingItem.currentParticipants}
              isApplied={clubMeetingItem.isApplied}
              isMember={isMember}
              loginMemberId={loginMemberId}
              meetingLeaderId={clubMeetingItem.meetingLeaderId}
              role={role}
              entryfee={clubMeetingItem.entryfee}
              meetingId={clubMeetingItem.meetingId}
              clubId={clubId}
            />
          ))
        ) : (
          <div className="club-meeting-list-empty">
            <span>아직 등록된 정기 모임이 없어요.</span>
          </div>
        )}
      </div>
      {isMember ? (
        <Button
          className="club-meeting-create-button"
          onClick={() => {
            navigate(`/club/${clubId}/clubmeeting/register`);
          }}
          type="button"
          title="정기 모임 만들기"
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ClubMeetingList;
