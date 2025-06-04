import React, { useState } from 'react';
import Title from '../text/Title';
import { useNavigate } from 'react-router-dom';
import ClubMemberItem from './ClubMemberItem';
import { ClubMemberListItem } from '../../../api/ApiTypes';
import '../../../styles/club/detail/ClubMemberList.scss';

interface ClubMemberListProps {
  role: string | null;
  clubId: string;
  clubMemberList: ClubMemberListItem[];
}

const ClubMemberList = ({
  role,
  clubId,
  clubMemberList,
}: ClubMemberListProps) => {
  const navigate = useNavigate();

  const [openMemberList, setOpenMemberList] = useState<boolean>(false);

  return (
    <div className="club-detail-member-container">
      <div className="club-detail-member-title-box">
        <Title className="club-detail-item-sub-title" titleName="멤버 소개" />
        {/* 멤버 관리 버튼 영역(모임장, 운영진 권한) */}
        {role === 'LEADER' || role === 'MANAGER' ? (
          <div
            className="club-detail-member-admin-button-container"
            onClick={() => navigate(`/club/member/${clubId}`)}
          >
            <div className="club-detail-member-admin-icon"></div>
            <div className="club-detail-member-admin-text">
              <span>멤버 관리</span>
            </div>
          </div>
        ) : (
          <></>
        )}
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
        }}
      >
        <span>멤버 더보기</span>
        <div className="club-member-more-icon"></div>
      </button>
    </div>
  );
};

export default ClubMemberList;
