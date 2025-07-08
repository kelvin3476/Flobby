import React from 'react';
import '../../../styles/club/detail/ClubMemberItem.scss';

interface ClubMemberListProps {
  clubMemberId: number;
  profilePhoto: string;
  nickname: string;
  role: string | null;
  isNew?: boolean;
  isLoginUser: boolean;
  isMemberTab?: boolean;
}

const ClubMemberItem = ({
  clubMemberId,
  profilePhoto,
  nickname,
  role,
  isNew,
  isLoginUser,
  isMemberTab,
}: ClubMemberListProps) => {
  return (
    <div className="club-detail-member-item-container" key={clubMemberId}>
      <div className="club-detail-member-info-box">
        <img
          src={profilePhoto || '/img/header/profile-ex.jpg'}
          alt="프로필 이미지"
          className={isMemberTab ? 'member-tab' : ''}
        />
        <span>{nickname}</span>

        {/* 권한 아이콘 */}
        <div
          className={`club-detail-member-role-icon ${role ? role.toLocaleLowerCase() : ''} ${isMemberTab ? 'member-tab' : ''}`}
        ></div>
      </div>

      {/* 나 tag */}
      {isLoginUser && (
        <div className="club-detail-member-me-tag">
          <span>나</span>
        </div>
      )}

      {/* new Tag */}
      {isNew && !isLoginUser && (
        <div className="club-detail-member-new-tag">
          <span>new</span>
        </div>
      )}
    </div>
  );
};

export default ClubMemberItem;
