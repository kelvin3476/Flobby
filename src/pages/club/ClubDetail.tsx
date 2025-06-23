import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import MainHeader from '../../components/header/MainHeader';
import Tab from '../../components/tab/Tab';
import DetailInfo from '../../components/club/detail/DetailInfo';
import DetailDescription from '../../components/club/detail/DetailDescription';
import ClubMeetingList from '../../components/club/detail/ClubMeetingList';
import ClubMemberList from '../../components/club/detail/ClubMemberList';
import RecommendClubList from '../../components/club/detail/RecommendClubList';
import ClubMemberManagement from '../../components/club/detail/ClubMemberManagement';

import useMainPage from '../../hooks/main/useMainPage';

import {
  ClubDTO,
  ClubMeetingListItem,
  ClubMemberListItem,
  RecommendClubListItem,
} from '../../api/ApiTypes';
import { ClubController } from '../../services/club/controllers/ClubController';

import logger from '../../utils/Logger';
import LoadingSpinnerController from '../../components/controllers/LoadingSpinnerController';

import '../../styles/club/detail/ClubDetail.scss';

const ClubDetail = () => {
  const { clubId } = useParams<{ clubId: string }>();

  const { accessToken, mainDataList, setMainDataList } = useMainPage();

  const [isMember, setIsMember] = useState<boolean>(false);
  const [loginMemberId, setLoginMemberId] = useState<number | null>(null);
  const [loginUserRole, setLoginUserRole] = useState<string | null>(null);
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchClubDetail = React.useCallback(async () => {
    setIsLoading(true);
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
      setLoginUserRole(response.role);
      setClubMeetingList(response.clubMeetingList);
      setClubMemberList(response.clubMemberList);
      setRecommendClubList(response.recommendClubList);
      logger.log('모임 상세 정보:', response);
    } catch (error) {
      logger.error('모임 상세 정보를 가져오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }
  }, [clubId]);

  React.useEffect(() => {
    if (!clubId) return console.log('모임 ID가 없습니다.');

    /* 비로그인 시 모임 상세 호출 */
    if (!localStorage.getItem('token-storage')) {
      /* 모임 상세 정보를 가져오는 API 호출 */
      fetchClubDetail();
    } else {
      /* 로그인 상태 에서 새로 고침 시 재발급 된 토큰이 유효한 경우 */
      if (accessToken && (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload") {
        /* 모임 상세 정보를 가져오는 API 호출 */
        fetchClubDetail();
      }
    }
  }, [clubId, accessToken, fetchClubDetail]);

  const tabItems = [
    { label: '홈', key: 'home' },
    { label: '게시판', key: 'board' },
    { label: '멤버', key: 'member' },
  ];

  return (
    <div className="club-detail-wrapper">
      <MainHeader
        accessToken={accessToken}
        mainDataList={mainDataList}
        setMainDataList={setMainDataList}
      />

      <div className="club-detail-container">
        <Tab
          tabs={tabItems}
          currentTab={currentTab}
          onTabChange={setCurrentTab}
        />

        {isLoading ? (
          <LoadingSpinnerController />
        ) : (
          <>
            <div className="club-detail-content">
              {currentTab === 'home' && clubInfo && (
                <>
                  <DetailInfo
                    accessToken={accessToken}
                    clubId={clubId}
                    loginUserRole={loginUserRole}
                    isMember={isMember}
                    clubName={clubInfo.clubName}
                    location={clubInfo.location}
                    currentMembers={clubInfo.currentMembers}
                    maxMembers={clubInfo.maxMembers}
                    clubImage={clubInfo.clubImage}
                    subCategory={clubInfo.subCategory}
                    fetchClubDetail={fetchClubDetail}
                  />
                  <DetailDescription description={clubInfo.description} />
                  <ClubMeetingList
                    clubMeetingList={clubMeetingList}
                    loginMemberId={loginMemberId}
                    loginUserRole={loginUserRole}
                    isMember={isMember}
                    clubId={clubId}
                  />
                  <ClubMemberList
                    clubMemberList={clubMemberList}
                    setCurrentTab={setCurrentTab}
                  />
                  <RecommendClubList
                    recommendClubList={recommendClubList}
                    isDetailPage={
                      window.location.pathname === `/club/${clubId}`
                    }
                  />
                </>
              )}

              {currentTab === 'board' && <div>게시판 탭 준비중</div>}
              {currentTab === 'member' && (
                <ClubMemberManagement
                  clubMemberList={clubMemberList}
                  currentMembers={clubInfo.currentMembers}
                  maxMembers={clubInfo.maxMembers}
                  loginUserRole={loginUserRole}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClubDetail;
