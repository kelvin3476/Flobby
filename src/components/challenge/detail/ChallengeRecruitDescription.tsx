import React, { useEffect, useRef, useState } from 'react';

import { ChallengeRecruitDescriptionType } from '@/api/ApiTypes';

import '@/styles/challenge/detail/ChallengeRecruitDescription.scss';

interface ChallengeRecruitDescriptionTypeProps {
  challengeRecruitDescriptionType: ChallengeRecruitDescriptionType;
}

const MAX_HEIGHT = 1200;

const ChallengeRecruitDescription = ({ challengeRecruitDescriptionType }: ChallengeRecruitDescriptionTypeProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      if (height > MAX_HEIGHT) {
        setShowMoreButton(true);
      }
    }
  }, [challengeRecruitDescriptionType]);

  return (
    <div className="challenge-recruit-description-wrapper">
      <div className="challenge-recruit-description-title">우리 챌린지를 소개해요</div>
      <div
        ref={contentRef}
        className={`challenge-recruit-description-content ${
          isExpanded ? 'expanded' : ''
        }`}
      >
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

      {showMoreButton && (
        <button
          className="challenge-recruit-description-more-btn"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          {isExpanded ? '접기' : '더보기'}
          <span className="challenge-recruit-description-more-btn-image"></span>
        </button>
      )}
    </div>
  );
};

export default ChallengeRecruitDescription;