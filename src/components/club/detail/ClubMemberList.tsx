import React, { useState } from 'react';
import Title from '../text/Title';
import ClubMemberItem from './ClubMemberItem';
import { ClubMemberListItem } from '../../../api/ApiTypes';
import '../../../styles/club/detail/ClubMemberList.scss';

interface ClubMemberListProps {
  clubMemberList: ClubMemberListItem[];
  setCurrentTab: (key: string) => void;
}

const ClubMemberList = ({
  clubMemberList,
  setCurrentTab,
}: ClubMemberListProps) => {
  const [openMemberList, setOpenMemberList] = useState<boolean>(false);

  return (
    <div className="club-detail-member-container">
      <div className="club-detail-member-title-box">
        <Title className="club-detail-item-sub-title" titleName="멤버 소개" />
      </div>

      {/* 멤버리스트 map */}
      <div className="club-member-list-container">
        {clubMemberList.map((memberItem, index) => {
          if (!openMemberList && index >= 5) return null;

          return (
            <div className="club-member-list" key={memberItem.clubMemberId}>
              <ClubMemberItem
                clubMemberId={memberItem.clubMemberId}
                nickname={memberItem.nickname}
                role={memberItem.role}
                profilePhoto={memberItem.profilePhoto}
              />
            </div>
          );
        })}
      </div>

      {/* 멤버 더보기 버튼 */}
      <button
        type="button"
        className="club-member-more-button"
        onClick={() => {
          setOpenMemberList(!openMemberList);
          setCurrentTab('member');
        }}
      >
        <span>멤버 더보기</span>
        <div className="club-member-more-icon"></div>
      </button>
    </div>
  );
};

export default ClubMemberList;
