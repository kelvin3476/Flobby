import React from 'react';
import { GetRecommendChallengesResponse } from '@/api/ApiTypes';

import '@/styles/challenge/detail/ChallengeDetailRecommend.scss';
import ChallengeItem from '@/components/main/club/ChallengeItem';

interface ChallengeRecommendProps {
  recommendChallenges: GetRecommendChallengesResponse[];
}

const ChallengeDetailRecommend = ({
  recommendChallenges,
}: ChallengeRecommendProps) => {
  return (
    <div className="challenge-detail-recommend-container">
      <div className="challenge-detail-recommend-title">
        이런 챌린지는 어때요?
      </div>

      <div className="challenge-detail-recommend-list-wrapper">
        {recommendChallenges &&
          recommendChallenges.length > 0 &&
          recommendChallenges.map(recommendChallengeItem => (
            <ChallengeItem
              clubId={recommendChallengeItem.challengeId}
              mainCategory={recommendChallengeItem.mainCategory}
              maxMember={recommendChallengeItem.maxMember}
              clubName={recommendChallengeItem.challengeName}
              regionName={recommendChallengeItem.regionName}
              currentMember={recommendChallengeItem.currentMember}
              photoUrl={recommendChallengeItem.mainPhotoUrl}
              recruitDday={recommendChallengeItem.recruitDday}
              className="recommend"
              key={recommendChallengeItem.challengeId}
            />
          ))}

        {recommendChallenges && recommendChallenges.length === 0 && (
          <div className="challenge-detail-recommend-list-empty">
            추천 챌린지가 없어요
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailRecommend;
