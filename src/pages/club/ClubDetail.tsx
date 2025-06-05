import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { ClubController } from '../../services/club/controllers/ClubController';

import logger from '../../utils/Logger';
import {
  ClubDTO,
  ClubMeetingListItem,
  ClubMemberListItem,
  RecommendClubListItem,
} from '../../api/ApiTypes';
import ClubMeetingList from '../../components/club/detail/ClubMeetingList';

import Tab from '../../components/tab/Tab';
import DetailInfo from '../../components/club/detail/DetailInfo';
import DetailDescription from '../../components/club/detail/DetailDescription';
import ClubMemberList from '../../components/club/detail/ClubMemberList';
import RecommendClubList from '../../components/club/detail/RecommendClubList';

const ClubDetail = () => {
  const { clubId } = useParams<{ clubId: string }>();

  const [isMember, setIsMember] = useState<boolean>(false);
  const [loginMemberId, setLoginMemberId] = useState<number | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [clubInfo, setClubInfo] = useState<ClubDTO>(null);
  const [clubMeetingList, setClubMeetingList] = useState<ClubMeetingListItem[]>(
    [],
  );
  const [clubMemberList, setClubMemberList] = useState<ClubMemberListItem[]>(
    [],
  );
  const [recommendClubList, setRecommendClubList] = useState<
    RecommendClubListItem[]
  >([]);

  React.useEffect(() => {
    if (!clubId) {
      logger.error('모임 ID가 제공되지 않았습니다.');
      return;
    }

    // 모임 상세 정보를 가져오는 API 호출
    const fetchClubDetail = async () => {
      try {
        // 여기에 API 호출 로직을 추가하세요.
        logger.log(`모임 ID: ${clubId}`);
        const response = await ClubController.getInstance().selectClubDetail(
          Number(clubId),
        );
        setClubInfo(response.clubDTO);
        setClubMeetingList(response.clubMeetingList);
        setIsMember(response.isMember);
        setLoginMemberId(response.loginMemberId);
        setRole(response.role);
        setClubMeetingList(response.clubMeetingList);
        setClubMemberList(response.clubMemberList);
        setRecommendClubList(response.recommendClubList);
        logger.log('모임 상세 정보:', response);
      } catch (error) {
        logger.error('모임 상세 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchClubDetail();
  }, [clubId]);

  const tabItems = [
    { label: '홈', key: 'home' },
    { label: '게시판', key: 'board' },
    { label: '멤버', key: 'member' },
  ];

  return (
    <div>
      <Tab
        tabs={tabItems}
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />

      {currentTab === 'home' && clubInfo && (
        <>
          <DetailInfo
            role={role}
            isMember={isMember}
            clubName={clubInfo.clubName}
            location={clubInfo.location}
            currentMembers={clubInfo.currentMembers}
            maxMembers={clubInfo.maxMembers}
            clubImage={clubInfo.clubImage}
            subCategory={clubInfo.subCategory}
          />
          <DetailDescription description={clubInfo.description} />
          <ClubMeetingList
            clubMeetingList={clubMeetingList}
            loginMemberId={loginMemberId}
            role={role}
            isMember={isMember}
            clubId={clubId}
          />
          <ClubMemberList
            role={role}
            clubId={clubId}
            clubMemberList={clubMemberList}
          />
          <RecommendClubList
            recommendClubList={recommendClubList}
            isDetailPage={window.location.pathname === `/club/${clubId}`}
          />
        </>
      )}

      {currentTab === 'board' && <div>게시판 탭 준비중</div>}
      {currentTab === 'member' && <div>멤버 탭 준비중</div>}
    </div>
  );
};

export default ClubDetail;
