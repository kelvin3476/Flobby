import React from 'react';
import { useNavigate } from 'react-router-dom';

import ClubItem from '@/components/main/club/ClubItem';
import { ChallengeItem } from '@/api/ApiTypes';

import LoadingSpinnerController from '@/components/controllers/LoadingSpinnerController';

import '@/styles/challenge/list/ChallengeList.scss';

interface ChallengeListProps {
  challengeList: ChallengeItem[] | null;
  accessToken: string | null;
  isLoading?: boolean;
  pageType?: string; // search, list, ...
}
const ChallengeList = ({
  challengeList,
  accessToken,
  isLoading,
  pageType,
}: ChallengeListProps) => {
  const navigate = useNavigate();
  return (
    <div className="challenge-all-list-container">
      <div className="challenge-all-list-box">
        <>
          {challengeList && challengeList.length > 0 ? (
            /* challengeList 있을 경우 */
            challengeList
              .reduce((rows, clubItem, index) => {
                if (index % 5 === 0) rows.push([]);
                rows[rows.length - 1].push(clubItem);
                return rows;
              }, [])
              .map((clubItemsInRow, rowIndex) => (
                <div className="challenge-all-row" key={rowIndex}>
                  {clubItemsInRow.map(clubItemInRow => (
                    <ClubItem
                      key={clubItemInRow.clubId}
                      clubId={clubItemInRow.clubId}
                      photo={clubItemInRow.photo}
                      hostId={clubItemInRow.hostId}
                      hostNickname={clubItemInRow.hostNickname}
                      category={clubItemInRow.category}
                      maxMember={clubItemInRow.maxMember}
                      clubName={clubItemInRow.clubName}
                      locationName={clubItemInRow.locationName}
                      currentMembers={clubItemInRow.currentMembers}
                      subCategory={clubItemInRow.subCategory}
                      postCategory={clubItemInRow.postCategory}
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
              <div className="challenge-all-list-exception-text-box">
                <span>
                  {pageType === 'search'
                    ? '검색 결과가 없어요'
                    : '근처에 개설된 챌린지가 없어요'}
                </span>
                <span>
                  {pageType === 'search'
                    ? '다른 키워드로 검색해 보세요.'
                    : '지역을 바꾸거나 다른 카테고리의 챌린지를 살펴보세요'}
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
                <span>
                  원하는 챌린지가 없나요? 직접 챌린지를 만들 수 있어요!
                </span>
              </button>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default ChallengeList;
