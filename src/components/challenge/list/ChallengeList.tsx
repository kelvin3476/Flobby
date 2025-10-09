import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChallengeItemType } from '@/api/ApiTypes';
import ChallengeItem from '@/components/main/club/ChallengeItem';
import LoadingSpinnerController from '@/components/controllers/LoadingSpinnerController';

import '@/styles/challenge/list/ChallengeList.scss';

interface ChallengeListProps {
  challengeList: ChallengeItemType[] | null;
  accessToken: string | null;
  isLoading?: boolean;
  pageType?: string; // search, ...
}
const ChallengeList = ({
  challengeList,
  accessToken,
  isLoading,
  pageType,
}: ChallengeListProps) => {
  const navigate = useNavigate();

  const exceptionTexts = {
    search: {
      primary: '검색 결과가 없어요',
      secondary: '다른 키워드로 검색해 보세요.',
    },
    default: {
      primary: '근처에 개설된 챌린지가 없어요',
      secondary: '지역을 바꾸거나 다른 카테고리의 챌린지를 살펴보세요',
    },
  };

  return (
    <div className="challenge-all-list-container">
      {challengeList && challengeList.length > 0 ? (
        /* challengeList 있을 경우 */
        challengeList
          .reduce<ChallengeItemType[][]>((rows, challengeItem, index) => {
            /* 검색 페이지일 경우 5개씩, 그 외 페이지는 4개씩 */
            const rowCount = pageType === 'search' ? 5 : 4;

            if (index % rowCount === 0) rows.push([]);
            rows[rows.length - 1].push(challengeItem);
            return rows;
          }, [])
          .map((challengeItemsInRow, rowIndex) => (
            <div
              className={`challenge-all-row ${pageType === 'search' ? 'search' : 'default'}`}
              key={rowIndex}
            >
              {challengeItemsInRow.map(challengeItemInRow => (
                <ChallengeItem
                  key={challengeItemInRow.challengeId}
                  clubId={challengeItemInRow.challengeId}
                  photoUrl={challengeItemInRow.photoUrl}
                  mainCategory={challengeItemInRow.mainCategory}
                  maxMember={challengeItemInRow.maxMember}
                  clubName={challengeItemInRow.challengeName}
                  regionName={challengeItemInRow.regionName}
                  currentMember={challengeItemInRow.currentMember}
                />
              ))}
            </div>
          ))
      ) : isLoading ? (
        /* 로딩 중일 경우 */
        <LoadingSpinnerController />
      ) : (
        /* challengeList 없을 경우 예외 처리 */
        <div className="challenge-all-list-exception-box">
          <div
            className={`challenge-all-list-exception-text-box ${pageType === 'search' ? 'search' : 'default'}`}
          >
            <span>
              {pageType === 'search'
                ? exceptionTexts.search.primary
                : exceptionTexts.default.primary}
            </span>
            <span>
              {pageType === 'search'
                ? exceptionTexts.search.secondary
                : exceptionTexts.default.secondary}
            </span>
          </div>
          <button
            type="button"
            /* 로그인 유저 : 정기 모임 등록 페이지로 이동, 비로그인 유저 : 로그인 페이지로 이동 */
            onClick={() =>
              accessToken ? navigate('/club/register') : navigate('/login')
            }
          >
            <div className="challenge-all-list-exception-icon"></div>
            <span>원하는 챌린지가 없나요? 직접 챌린지를 만들 수 있어요!</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ChallengeList;
