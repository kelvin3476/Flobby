import React from 'react';
import '../../../styles/club/detail/ClubMemberItem.scss';

interface ClubMemberListProps {
  clubMemberId: number;
  profilePhoto: string;
  nickname: string;
  role: string | null;
}

const ClubMemberItem = ({
  clubMemberId,
  profilePhoto,
  nickname,
  role,
}: ClubMemberListProps) => {
  return (
    <div className="club-detail-member-item-container" key={clubMemberId}>
      <div className="club-detail-member-info-box">
        <img
          src={profilePhoto || '/img/header/profile-ex.jpg'}
          alt="프로필 이미지"
        />
        <span>{nickname}</span>
      </div>
      <div
        className={`club-detail-member-role-icon ${role ? role.toLocaleLowerCase() : ''}`}
      ></div>
    </div>
  );
};

export default ClubMemberItem;
