import React from 'react';

import Chip from '@/components/button/Chip';

import '@/styles/modal/SearchModal.scss';
import { SearchChallengeController } from '@/services/challenge/controllers/SearchChallengeController';
import { PopularKeywordData } from '@/api/ApiTypes';

interface SearchModalProps {
  onClose: () => void;
}

const recentSearchData = [
  '최근 검색어',
  '최근 검색',
  '최근',
  '검색',
  '최근입니다',
  '최근입니다',
  '검색어',
  '최근 검색입니다',
  '검색어입니다',
  '마지막 검색어입니다',
];

const SearchModal = ({ onClose }: SearchModalProps) => {
  const [popularKeywordList, setPopularKeywordList] = React.useState<
    PopularKeywordData[]
  >([]);

  const challengeController = SearchChallengeController.getInstance();

  const getPopularKeywords = async () => {
    const popularKeywordData = await challengeController.getPopularKeywords();
    if (popularKeywordData) setPopularKeywordList(popularKeywordData);
  };

  React.useEffect(() => {
    getPopularKeywords();

    const updateOverlayPosition = () => {
      const mainHeader = document.querySelector(
        '.header-container',
      ) as HTMLElement;
      const searchModalOverlay = document.querySelector(
        '.search-modal-overlay',
      ) as HTMLElement;

      if (mainHeader && searchModalOverlay) {
        const mainHeaderHeight = mainHeader.offsetHeight;
        const mainHeaderTop = mainHeader.offsetTop; // 대부분 0, 해상도가 엄청 커지는 경우 필요
        const windowHeight = window.innerHeight; // 정확한 실제 브라우저 viewport height
        const scrollY = window.scrollY; // 현재 스크롤 위치

        // 스크롤 값이 헤더 크기 만큼 생겼을 경우, 오버레이가 화면을 꽉 채우도록 조정
        if (scrollY > mainHeaderHeight + mainHeaderTop) {
          searchModalOverlay.style.top = '0px'; // 스크롤이 있으면 헤더 위로 고정
          searchModalOverlay.style.height = `${windowHeight}px`; // 화면 크기만큼 채움
        } else {
          // 스크롤이 없으면 헤더 아래로 위치 조정
          searchModalOverlay.style.top = `${mainHeaderHeight + mainHeaderTop}px`;
          searchModalOverlay.style.height = `${windowHeight - mainHeaderHeight}px`; // 헤더 아래로 화면 채움
        }
      }
    };

    updateOverlayPosition();
    window.addEventListener('resize', updateOverlayPosition);
    window.addEventListener('scroll', updateOverlayPosition);

    return () => {
      window.removeEventListener('resize', updateOverlayPosition);
      window.removeEventListener('scroll', updateOverlayPosition);
    };
  }, []);

  const renderedItems = popularKeywordList.map((item, idx) => (
    <div key={idx}>
      <span className={`trending-search-keyword-rank ${idx < 3 ? 'top3' : ''}`}>
        {item.rank}
      </span>
      <span
        className={`trending-search-keyword ${item.keyword.length >= 12 ? 'long' : ''}`}
        onClick={() => console.log('인기 검색어 클릭!!')}
      >
        {item.keyword}
      </span>
    </div>
  ));

  return (
    <>
      {/* 오버레이 */}
      <div className="search-modal-overlay" onClick={onClose}></div>

      {/* 검색창 모달 */}
      <div
        className="search-modal-container"
        onClick={e => e.stopPropagation()}
      >
        <div
          className="search-modal-sub-container"
          onClick={e => e.stopPropagation()}
        >
          <div className="recent-search-container">
            <div className="recent-search-header">
              <span className="recent-search-title">최근 검색어</span>
              <span
                className="recent-search-delete-all"
                onClick={() => console.log('최근 검색어 전체 지우기!!')}
              >
                모두 지우기
              </span>
            </div>
            <div className="recent-search-keyword-container">
              {recentSearchData.length > 0 ? (
                recentSearchData.map((item, idx) => (
                  <Chip
                    key={idx}
                    text={item}
                    onClick={() => console.log('최근 검색어 클릭!!')}
                    onDelete={() => console.log('최근 검색어 삭제!!')}
                  />
                ))
              ) : (
                <span className="recent-search-keyword-empty">
                  최근 검색어가 없습니다
                </span>
              )}
            </div>
          </div>
          <div className="trending-search-container">
            <div className="trending-search-title">인기 검색어</div>
            <div className="trending-search-keyword-container">
              <div className="left-section">
                {renderedItems.filter((_, idx) => idx < 5)}
              </div>
              <div className="right-section">
                {renderedItems.filter((_, idx) => idx >= 5)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
