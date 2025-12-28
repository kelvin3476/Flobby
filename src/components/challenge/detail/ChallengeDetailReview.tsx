import React from 'react';

import '@/styles/challenge/detail/ChallengeDetailReview.scss';

import { useNavigate } from 'react-router-dom';
import { ChallengeReviewItemType } from '@/api/ApiTypes';
import ChallengeDetailReviewItem from './ChallengeDetailReviewItem';

interface ChallengeDetailReviewProps {
  challengeId: number;
  challengeDetailReview: ChallengeReviewItemType[];
}

const ChallengeDetailReview = ({
  challengeId,
  challengeDetailReview,
}: ChallengeDetailReviewProps) => {
  const navigate = useNavigate();
  console.log('challengeDetailReview', challengeDetailReview);

  return (
    <div className="challenge-detail-review-container">
      <div className="challenge-detail-review-title">후기</div>

      <div className="challenge-detail-review-content-wrapper">
        <div className="challenge-detail-review-content-container">
          {challengeDetailReview?.map((challengeDetailReviewItem, index) => (
            <>
              {index !== 0 && (
                <div className="challenge-detail-review-item-divider"></div>
              )}
              <ChallengeDetailReviewItem
                ChallengeDetailReviewItem={challengeDetailReviewItem}
              />
            </>
          ))}
        </div>

        <div className="challenge-detail-review-btn-container">
          <div
            className="challenge-detail-review-more-btn"
            onClick={() => navigate(`/challenge/${challengeId}/review`)}
          >
            <div className="challenge-detail-review-more-btn-text">
              {challengeDetailReview?.length}개 후기 전체보기
            </div>
            <div className="challenge-detail-review-more-btn-icon"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailReview;
