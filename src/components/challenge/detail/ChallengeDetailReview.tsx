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

  return (
    <div className="challenge-detail-review-container">
      <div className="challenge-detail-review-title">후기</div>

      <div className="challenge-detail-review-content-wrapper">
        <div className="challenge-detail-review-content-container">
          {challengeDetailReview &&
            challengeDetailReview.length > 0 &&
            challengeDetailReview?.map((challengeDetailReviewItem, index) => (
              <>
                {index !== 0 && (
                  <div className="challenge-detail-review-item-divider"></div>
                )}
                <ChallengeDetailReviewItem
                  ChallengeDetailReviewItem={challengeDetailReviewItem}
                />
              </>
            ))}

          {/* TODO: 임치예외처리 => 메세지 확인 필요 */}
          {challengeDetailReview.length === 0 && (
            <div className="challenge-detail-review-empty">
              아직 작성된 후기가 없어요
            </div>
          )}
        </div>

        {/* TODO: 후기 없을 때 버튼 노출 X => 예외처리 확인 필요 */}
        {challengeDetailReview && challengeDetailReview.length > 0 && (
          <div className="challenge-detail-review-btn-container">
            <div
              className="challenge-detail-review-more-btn"
              onClick={() => navigate(`/challenge/${challengeId}/review`)}
            >
              <div className="challenge-detail-review-more-btn-text">
                {challengeDetailReview.length}개 후기 전체보기
              </div>
              <div className="challenge-detail-review-more-btn-icon"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailReview;
