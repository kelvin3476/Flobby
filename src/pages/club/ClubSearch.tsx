import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import MainHeader from '../../components/header/MainHeader';
import Title from '../../components/club/text/Title';
import Tab from '../../components/tab/Tab';
import ClubList from "../../components/club/list/ClubList";
import RecommendClubList from "../../components/club/detail/RecommendClubList";

import useMainPage from '../../hooks/main/useMainPage';

import { clubItem, onedayItem, RecommendClubListItem } from '../../api/ApiTypes';
import { ClubController } from "../../services/club/controllers/ClubController";

import logger from '../../utils/Logger';

import '../../styles/club/search/ClubSearch.scss';

const ClubSearch = () => {
  const navigate = useNavigate();
  /* 검색 키워드 url 에서 추출후 디코딩 */
  const location = useLocation();
  const searchKeyword = decodeURI(new URLSearchParams(location.search).get('keyword'));

  const [currentTab, setCurrentTab] = React.useState<string>('oneday');
  const [onedayList, setOnedayList] = React.useState<onedayItem[]>([]); /* TODO: 원데이 데이터도 추후 추가 예정 */
  const [clubList, setClubList] = React.useState<clubItem[]>([]);
  const [recommendClubList, setRecommendClubList] = React.useState<RecommendClubListItem[]>([]); /* 추천 모임 리스트 */

  const { accessToken, mainDataList, setMainDataList } = useMainPage();

  const tabItems = [
    { label: '원데이', key: 'oneday' },
    { label: '모임', key: 'club' },
  ];

  const clubController = ClubController.getInstance();

  /* 검색 결과 불러오는 메소드 */
  const fetchSearchList = async () => {
    if (!searchKeyword) {
      logger.warn('검색 키워드가 제공되지 않았습니다.');
      return;
    }

    try {
      logger.log('모임 검색 키워드:', searchKeyword);
      const clubListData = await clubController.searchClubList(searchKeyword);
      setClubList(clubListData);
      // setRecommendClubList(clubListData.recommendClubList) /* TODO: 추천 모임 리스트 데이터 내려오면 추후 연동 */
    } catch (error) {
      logger.error('모임 검색 실패:', error);
    }
  };

  /* 초기 검색 결과 페이지 진입시 호출 */
  React.useEffect(() => {
    fetchSearchList();
  }, [searchKeyword]);

  return (
    <div className='club-search-wrapper'>
      <MainHeader accessToken={accessToken} mainDataList={mainDataList} setMainDataList={setMainDataList} />
      <div className='club-search-container'>
        {clubList.length === 0 && onedayList.length === 0 ? (
          <>
            <div className='club-search-title-container'>
              <Title titleName="검색 결과" />
              <div className='club-search-sub-title-container'>
                <div className='club-search-empty'>검색 결과가 없어요. 다른 키워드로 검색해 보세요.</div>
              </div>
            </div>
            <div className='club-search-empty'>
              <button
                  type="button"
                  /* 로그인 유저 : 정기 모임 등록 페이지로 이동, 비로그인 유저 : 로그인 페이지로 이동 */
                  onClick={() =>
                      accessToken ? navigate('/club/register') : navigate('/login')
                  }
              >
                <div className="club-search-exception-icon"></div>
                <span>원하는 모임이 없나요? 직접 모임을 만들 수 있어요!</span>
              </button>

              <RecommendClubList recommendClubList={recommendClubList} isDetailPage={false} />
            </div>
          </>
        ) : (
          <>
            <div className='club-search-title-container'>
              <Title titleName="검색 결과" />
              <div className='club-search-sub-title-container'>
                <div className='club-search-keyword-container'>
                  <span className='club-search-keyword'>'{ searchKeyword }'</span>
                  <span>에 대한</span>
                </div>
                <div className='club-search-count-container'>
                  <span className='club-search-count'>{clubList.length}</span>
                  <span>개 결과가 검색되었습니다.</span>
                </div>
              </div>
            </div>
            <div className='club-search-content-container'>
              <Tab tabs={tabItems} currentTab={currentTab} onTabChange={setCurrentTab}  />
              {currentTab === 'oneday' ? (
                /* TODO: 원데이 리스트 추가 필요 */
                <div>원데이 리스트 추후 추가 예정 (준비 중)</div>
              ) : (
                <ClubList clubList={clubList} accessToken={accessToken} />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClubSearch;