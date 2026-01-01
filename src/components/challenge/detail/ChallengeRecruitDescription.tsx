import React from 'react';

import { ChallengeRecruitDescriptionType } from '@/api/ApiTypes';

import '@/styles/challenge/detail/ChallengeRecruitDescription.scss';

interface ChallengeRecruitDescriptionTypeProps {
  challengeRecruitDescriptionType: ChallengeRecruitDescriptionType;
}

const ChallengeRecruitDescription = ({ challengeRecruitDescriptionType }: ChallengeRecruitDescriptionTypeProps) => {
  
  console.log('[challengeRecruitDescriptionType]', challengeRecruitDescriptionType)

  return (
    <div className="challenge-recruit-description-wrapper">
      <div className="challenge-recruit-description-title">우리 챌린지를 소개해요</div>
      <div className="challenge-recruit-description">{ challengeRecruitDescriptionType?.description }</div>
      {challengeRecruitDescriptionType &&
      challengeRecruitDescriptionType.images &&
      challengeRecruitDescriptionType.images.length > 0 &&
      <div className="challenge-recruit-description-images">
        {challengeRecruitDescriptionType?.images.map((challengeRecruitDescriptionTypeItem, index) => (
            <img key={challengeRecruitDescriptionTypeItem.orderNo} src={challengeRecruitDescriptionTypeItem.imageUrl} alt="챌린지 소개글 이미지" />
        ))}
      </div>
      }
    </div>
  );
};

export default ChallengeRecruitDescription;