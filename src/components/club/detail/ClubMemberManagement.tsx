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
      {/* 모임장 권한 */}
      {loginUserRole && loginUserRole === 'LEADER' && (
        <div className="club-member-management-list-container">
          {clubMemberList.map((memberItem, index) => {
            return (
              <div className="club-member-management-list-box">
                <div className="club-member-management-list">
                  {/* 아이템 영역 */}
                  <ClubMemberItem
                    clubMemberId={memberItem.clubMemberId}
                    nickname={memberItem.nickname}
                    role={memberItem.role}
                    profilePhoto={memberItem.profilePhoto}
                  />

                  {/* 버튼 영역 */}
                  {/* 모임장 권한: 모임장 양도, 운영진 해제, 강퇴*/}
                  {memberItem.role !== 'LEADER' && (
                    <div className="club-member-management-btn-container">
                      <button
                        type="button"
                        className="club-member-management-btn transfer-leader"
                      >
                        모임장 양도
                      </button>

                      {/* 운영진: 운영진 해제 버튼 노출 / 일반 멤버: 등록 버튼 노출 */}
                      {memberItem.role === 'MANAGER' && (
                        <button
                          type="button"
                          className="club-member-management-btn remove-manager"
                        >
                          운영진 해제
                        </button>
                      )}
                      {memberItem.role === 'MEMBER' && (
                        <button
                          type="button"
                          className="club-member-management-btn remove-manager"
                        >
                          운영진 등록
                        </button>
                      )}

                      <button
                        type="button"
                        className="club-member-management-btn kick-member"
                      >
                        강퇴
                      </button>
                    </div>
                  )}
                </div>

                {/* 구분선 */}
                <div
                  className={`divider ${clubMemberList.length - 1 === index ? 'last' : ''}`}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {/* 운영진 권한 */}
      {loginUserRole && loginUserRole === 'MANAGER' && (
        <div className="club-member-management-list-container">
          {clubMemberList.map((memberItem, index) => {
            return (
              <div className="club-member-management-list-box">
                <div className="club-member-management-list">
                  {/* 아이템 영역 */}
                  <ClubMemberItem
                    clubMemberId={memberItem.clubMemberId}
                    nickname={memberItem.nickname}
                    role={memberItem.role}
                    profilePhoto={memberItem.profilePhoto}
                  />

                  {/* 버튼 영역 */}
                  {/* 운영진 권한: 강퇴*/}
                  {memberItem.role === 'MEMBER' && (
                    <div className="club-member-management-btn-container">
                      {/* 모임장 & 운영진 공통 권한 */}
                      <button
                        type="button"
                        className="club-member-management-btn kick-member"
                      >
                        강퇴
                      </button>
                    </div>
                  )}
                </div>

                {/* 구분선 */}
                <div
                  className={`divider ${clubMemberList.length - 1 === index ? 'last' : ''}`}
                ></div>
              </div>
            );
          })}
        </div>
      )}

      {/* 일반 사용자(비로그인 유저 & 모임 일반 멤버) 권한 */}
      {(loginUserRole === null || loginUserRole === 'MEMBER') && (
        <div className="club-member-management-list-container">
          {clubMemberList.map(memberItem => {
            return (
              <ClubMemberItem
                clubMemberId={memberItem.clubMemberId}
                nickname={memberItem.nickname}
                role={memberItem.role}
                profilePhoto={memberItem.profilePhoto}
                key={memberItem.clubMemberId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ClubMemberManagement;
