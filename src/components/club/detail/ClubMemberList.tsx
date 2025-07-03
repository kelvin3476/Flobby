import React, { useEffect, useState } from 'react';
import Title from '../text/Title';
import ClubMemberItem from './ClubMemberItem';
import { ClubMemberListItem } from '../../../api/ApiTypes';
import '../../../styles/club/detail/ClubMemberList.scss';

interface ClubMemberListProps {
  clubMemberList: ClubMemberListItem[];
  setCurrentTab: (key: string) => void;
  loginMemberId: number | null;
}

const ClubMemberList = ({
  clubMemberList,
  setCurrentTab,
  loginMemberId,
}: ClubMemberListProps) => {
  const [loginUserItem, setLoginUserItem] = useState<ClubMemberListItem | null>(
    null,
  );
  const [withoutLoginUserMemberList, setWithoutLoginUserMemberList] = useState<
    ClubMemberListItem[]
  >([]);

  useEffect(() => {
    // 멤버 리스트에 로그인 유저가 있으면 찾아서 저장
    const loginUser = clubMemberList.find(
      member => member.clubMemberId === loginMemberId,
    );
    if (loginUser) setLoginUserItem(loginUser);

    // 로그인 유저를 제외한 리스트
    const filteredMemberList = clubMemberList.filter(
      member => member.clubMemberId !== loginMemberId,
    );
    setWithoutLoginUserMemberList(filteredMemberList);
  }, [clubMemberList]);

  return (
    <div className="club-detail-member-container">
      <div className="club-detail-member-title-box">
        <Title className="club-detail-item-sub-title" titleName="멤버 소개" />
      </div>

      {/* 멤버리스트 map */}
      <div className="club-member-list-container">
        {/* 로그인 유저 최상단 고정 */}
        {loginUserItem && (
          <ClubMemberItem
            clubMemberId={loginUserItem.clubMemberId}
            nickname={loginUserItem.nickname}
            role={loginUserItem.role}
            profilePhoto={loginUserItem.profilePhoto}
            isLoginUser={true}
          />
        )}

        {withoutLoginUserMemberList.map((memberItem, index) => {
          if (loginUserItem && index < 4)
            return (
              <div className="club-member-list" key={memberItem.clubMemberId}>
                <ClubMemberItem
                  clubMemberId={memberItem.clubMemberId}
                  nickname={memberItem.nickname}
                  role={memberItem.role}
                  profilePhoto={memberItem.profilePhoto}
                  isNew={memberItem.isNew}
                  isLoginUser={false}
                />
              </div>
            );
          else if (!loginUserItem && index < 5) {
            return (
              <div className="club-member-list" key={memberItem.clubMemberId}>
                <ClubMemberItem
                  clubMemberId={memberItem.clubMemberId}
                  nickname={memberItem.nickname}
                  role={memberItem.role}
                  profilePhoto={memberItem.profilePhoto}
                  isNew={memberItem.isNew}
                  isLoginUser={false}
                />
              </div>
            );
          }
        })}
      </div>

      {/* 멤버 더보기 버튼 */}
      <button
        type="button"
        className="club-member-more-button"
        onClick={() => {
          setCurrentTab('member');
        }}
      >
        <span>멤버 더보기</span>
      </button>
    </div>
  );
};

export default ClubMemberList;
