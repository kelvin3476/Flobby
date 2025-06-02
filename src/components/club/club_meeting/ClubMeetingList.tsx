import React from 'react';
import Title from '../text/Title';
import ClubMeetingItem from './ClubMeetingItem';
import Button from '../../button/Button';
import { ClubMeetingListItem } from '../../../api/ApiTypes';
import '../../../styles/club/club_meeting/ClubMeetingList.scss';

interface ClubMeetingListProp {
  clubMeetingList: ClubMeetingListItem[];
  loginMemberId: number;
  role: string;
  isMember: boolean;
}
const ClubMeetingList = ({
  clubMeetingList,
  loginMemberId,
  role,
  isMember,
}: ClubMeetingListProp) => {
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
              clubMeetingFee={clubMeetingItem.clubMeetingFee}
            />
          ))
        ) : (
          <div className="club-meeting-list-empty">
            <span>아직 등록된 정기 모임이 없어요.</span>
          </div>
        )}
      </div>
      <Button
        className="club-meeting-create-button"
        onClick={() => {}}
        type="button"
        title="정기 모임 만들기"
      />
    </div>
  );
};

export default ClubMeetingList;
