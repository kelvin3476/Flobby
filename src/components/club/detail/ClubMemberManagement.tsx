import React from 'react';
import { ClubMemberListItem } from '../../../api/ApiTypes';
import ClubMemberItem from './ClubMemberItem';
import '../../../styles/club/detail/ClubMemberManagement.scss';

interface ClubMemberManagementProps {
  clubMemberList: ClubMemberListItem[];
  currentMembers: number;
  maxMembers: number;
  loginUserRole: string | null; // 현재 로그인 유저의 해당 모임에 대한 role
}

const ClubMemberManagement = ({
  clubMemberList,
  currentMembers,
  maxMembers,
  loginUserRole,
}: ClubMemberManagementProps) => {
  /* 멤버 탭 최초 진입시 스크롤 최상단 고정 */
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="club-member-management-container">
      {/* 타이틀 */}
      <div className="club-member-management-title">
        <span>모임 멤버</span>
        <div className="club-member-management-title-num-box">
          (<span>{currentMembers}</span>/{maxMembers})
        </div>
      </div>

      {/* 멤버 리스트 */}
      <div className="club-member-management-list-container">
        {clubMemberList.map(memberItem => {
          return (
            <div
              className="club-member-management-list"
              key={memberItem.clubMemberId}
            >
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
    </div>
  );
};

export default ClubMemberManagement;
