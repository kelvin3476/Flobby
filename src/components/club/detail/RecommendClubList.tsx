import React from 'react';
import Title from '@/components/club/text/Title';
import {
  ChallengeItemType,
  ChallengeSearchItem,
  clubItem,
} from '@/api/ApiTypes';
import ChallengeItem from '@/components/main/club/ChallengeItem';

import '@/styles/club/detail/RecommendClubList.scss';

interface RecommendClubListProps {
  recommendClubList: ChallengeSearchItem[];
  isDetailPage: boolean;
  pageType?: string; // 페이지 타입 (예: 'search', 'detail')
}

const RecommendClubList = ({
  recommendClubList,
  isDetailPage,
  pageType,
}: RecommendClubListProps) => {
  return (
    <div className="recommend-club-list-container">
      <Title
        className="club-detail-item-sub-title"
        titleName={
          pageType === 'search'
            ? '이런 챌린지는 어때요?'
            : '이 챌린지와 비슷한 챌린지에요'
        }
      />
      {recommendClubList.length > 0 && (
        <div className="recommend-club-list">
          {recommendClubList.map(recommendClubItem => {
            return (
              <ChallengeItem
                key={recommendClubItem.challengeId}
                clubId={recommendClubItem.challengeId}
                clubName={recommendClubItem.challengeName}
                photoUrl={recommendClubItem.photoUrl}
                mainCategory={recommendClubItem.mainCategory}
                // subCategory={recommendClubItem.subCategory}
                currentMember={recommendClubItem.currentMember}
                maxMember={recommendClubItem.maxMember}
                regionName={recommendClubItem.regionName}
                // isDetailPage={isDetailPage}
                recruitDday={recommendClubItem.recruitDday}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommendClubList;
