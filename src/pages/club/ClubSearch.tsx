import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import MainHeader from '@/components/header/MainHeader';
import Button from '@/components/button/Button';
import Tab from '@/components/tab/Tab';
import { Option, SelectBox } from '@/components/selectbox/SelectBox';
import ChallengeList from '@/components/club/list/ChallengeList';
import RecommendClubList from '@/components/club/detail/RecommendClubList';

import useMainPage from '@/hooks/main/useMainPage';

import {
  onedayItem,
  getSearchChallengeResponse,
  ChallengeItem,
  challengeSortType,
} from '@/api/ApiTypes';

import logger from '@/utils/Logger';

import '@/styles/club/search/ClubSearch.scss';
import { SearchChallengeController } from '@/services/challenge/controllers/SearchChallengeController';

const selectBoxOptions: Option<challengeSortType>[] = [
  { label: '인기순', value: 'popular' },
  { label: '최신등록순', value: 'new' },
  { label: '모집 마감일순', value: 'deadline' },
];

const ClubSearch = () => {
  const navigate = useNavigate();
  /* 검색 키워드 url 에서 추출후 디코딩 */
  const location = useLocation();
  const searchKeyword = decodeURI(
    new URLSearchParams(location.search).get('keyword'),
  );

  const [currentTab, setCurrentTab] = React.useState<string>('challenge');
  const [feedList, setFeedList] = React.useState<onedayItem[]>(
    [],
  ); /* TODO: 피드 데이터도 추후 추가 예정 */
  const [challengeList, setChallengeList] = React.useState<ChallengeItem[]>([]);
  const [challengePopularList, setChallengePopularList] = React.useState<
    ChallengeItem[]
  >([]);
  const [challengeCount, setChallengeCount] = React.useState<number>(0);

  const [deadLine, setDeadLine] = React.useState<boolean>(false);
  const [select, setSelect] = React.useState<challengeSortType>('popular');

  const isFirst = React.useRef(true);
  const lastKeyword = React.useRef<string | null>(null);
  const lastSelect = React.useRef<challengeSortType | null>(null);

  const { accessToken } = useMainPage();

  const tabItems = [
    { label: '챌린지', key: 'challenge' },
    { label: '피드', key: 'feed' },
  ];

  const challengeController = SearchChallengeController.getInstance();

  /* 검색 결과 불러오는 메소드 */
  const fetchSearchList = async (sort: challengeSortType = 'popular') => {
    if (!searchKeyword) {
      logger.warn('검색 키워드가 제공되지 않았습니다.');
      return;
    }

    try {
      logger.log('모임 검색 키워드:', searchKeyword);
      const challengeListData: getSearchChallengeResponse =
        await challengeController.getSearchChallengeData(searchKeyword, sort);

      if (challengeListData) {
        setChallengeList(challengeListData.challengeSearchList);
        setChallengePopularList(challengeListData.challengePopularList);
        setChallengeCount(challengeListData.challengeCount);
      } else {
        setChallengeList([]);
        setChallengePopularList([]);
        setChallengeCount(0);
      }
    } catch (error) {
      logger.error('모임 검색 실패:', error);
    }
  };

  /* 초기 검색 결과 페이지 진입시 호출 */
  React.useEffect(() => {
    setSelect('popular');
    fetchSearchList('popular');
    isFirst.current = false;
    lastKeyword.current = searchKeyword;
    lastSelect.current = 'popular';
  }, [searchKeyword]);

  /* 필터링에 따른 호출 */
  React.useEffect(() => {
    if (!isFirst.current) {
      if (
        lastKeyword.current === searchKeyword &&
        lastSelect.current === select
      ) {
        return;
      }
      fetchSearchList(select);
      lastSelect.current = select;
    }
  }, [select]);

  const recruitingChallengeList = challengeList.filter(
    item => item.recruitFlag,
  );

  return (
    <div className="club-search-wrapper">
      <MainHeader accessToken={accessToken} />
      <div
        className={`club-search-container ${challengePopularList.length > 0 ? 'empty' : ''}`}
      >
        {challengePopularList.length > 0 ? (
          <>
            <Tab
              tabs={tabItems}
              currentTab={currentTab}
              onTabChange={setCurrentTab}
            />
            {currentTab === 'feed' ? (
              /* TODO: 피드 리스트 추가 필요 */
              <div>피드 리스트 추후 추가 예정 (준비 중)</div>
            ) : (
              <div className="club-search-empty-container">
                <div className="club-search-title-container">
                  <div className="club-search-sub-title-container">
                    <div className="club-search-empty">검색 결과가 없어요</div>
                    다른 키워드로 검색해 보세요.
                  </div>
                </div>
                <div className="club-search-empty">
                  <button
                    type="button"
                    /* 로그인 유저 : 모임 등록 페이지로 이동, 비로그인 유저 : 로그인 페이지로 이동 */
                    onClick={() =>
                      accessToken
                        ? navigate('/club/register')
                        : navigate('/login')
                    }
                  >
                    <div className="club-search-exception-icon"></div>
                    <span>
                      원하는 챌린지가 없나요? 직접 챌린지를 만들 수 있어요!
                    </span>
                  </button>

                  {/* 추천 모임 개수는 앞에서부터 5개 노출 */}
                  <RecommendClubList
                    recommendClubList={challengePopularList.slice(0, 5)}
                    isDetailPage={true}
                    pageType={'search'}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="club-search-title-container">
              <div className="club-search-title">
                <span className="club-search-keyword-wrapper">
                  <span className="club-search-quote">'</span>
                  <span
                    className={`club-search-keyword ${searchKeyword.length > 7 ? 'long' : ''}`}
                  >
                    {searchKeyword}
                  </span>
                  <span className="club-search-quote">'</span>
                </span>
                {searchKeyword.length > 7 ? <br></br> : ''}에 대한{' '}
                <span className="club-search-keyword-result-count">
                  {deadLine ? recruitingChallengeList.length : challengeCount}
                </span>
                개의 검색 결과
              </div>
            </div>
            <div className="club-search-content-container">
              <Tab
                tabs={tabItems}
                currentTab={currentTab}
                onTabChange={setCurrentTab}
              />
              {currentTab === 'feed' ? (
                /* TODO: 피드 리스트 추가 필요 */
                <div>피드 리스트 추후 추가 예정 (준비 중)</div>
              ) : (
                <div className="club-search-content-sub-container">
                  <div className="club-search-filter-container">
                    <Button
                      className={`club-search-filter-button ${deadLine ? 'active' : ''}`}
                      title="모집중만 보기"
                      onClick={() => setDeadLine(!deadLine)}
                    />
                    <SelectBox<challengeSortType>
                      options={selectBoxOptions}
                      placeholder="인기순"
                      value={select}
                      onChange={setSelect}
                    />
                  </div>
                  <ChallengeList
                    challengeList={
                      deadLine ? recruitingChallengeList : challengeList
                    }
                    accessToken={accessToken}
                    pageType="search"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClubSearch;
