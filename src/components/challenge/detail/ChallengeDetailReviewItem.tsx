import React, { useRef, useState } from 'react';

import { ChallengeReviewItemType } from '@/api/ApiTypes';

import '@/styles/challenge/detail/ChallengeDetailReviewItem.scss';

interface ChallengeDetailReviewItemProps {
  ChallengeDetailReviewItem: ChallengeReviewItemType;
}

const ChallengeDetailReviewItem = ({
  ChallengeDetailReviewItem,
}: ChallengeDetailReviewItemProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    ChallengeDetailReviewItem.liked,
  );
  const [likeCount, setLikeCount] = useState<number>(
    ChallengeDetailReviewItem.likeCount,
  );
  const date = new Date(ChallengeDetailReviewItem.createdAt);
  const createdAt = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;

  const handleClickLikeBtn = () => {
    // TODO: 좋아요 api 연동
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="challenge-detail-review-item-wrapper">
      <div className="challenge-detail-review-item-content-box">
        {/* header */}
        <div className="challenge-detail-review-item-content-header">
          <div className="challenge-detail-review-item-user-profile-box">
            <div className="challenge-detail-review-item-user-profile">
              <img
                className="challenge-detail-review-item-user-profile-img"
                src={
                  ChallengeDetailReviewItem.profileImageUrl ||
                  '/img/challenge/review/review_user_profile_img.jpg'
                }
                alt="reviewer-profile-img"
              />

              <div className="challenge-detail-review-item-user-profile-info">
                <span className="challenge-detail-review-item-user-profile-nick">
                  {ChallengeDetailReviewItem.nickname}
                </span>
                <span>·</span>
                <span className="">
                  {ChallengeDetailReviewItem.seasonNumber}기
                </span>
              </div>
            </div>

            <div className="challenge-detail-review-item-created-at">
              {createdAt}
            </div>
          </div>
        </div>

        {/* description */}
        <div className="challenge-detail-review-item-description">
          {ChallengeDetailReviewItem.description}
        </div>
      </div>

      {/* images */}
      {ChallengeDetailReviewItem.images.length > 0 && (
        <div className="challenge-detail-review-item-img-box">
          {ChallengeDetailReviewItem.images.map(img => {
            return (
              <img
                className="challenge-detail-review-item-img"
                src={img.imageUrl}
                key={img.orderNo}
              />
            );
          })}
        </div>
      )}

      {/* likes */}
      <div className="challenge-detail-review-item-like-box">
        <div
          className={`challenge-detail-review-item-like-icon ${isLiked || ChallengeDetailReviewItem.liked ? 'isActive' : ''}`}
          onClick={handleClickLikeBtn}
        ></div>
        <span
          className={`challenge-detail-review-item-like-count ${isLiked || ChallengeDetailReviewItem.liked ? 'isActive' : ''}`}
        >
          {likeCount}
        </span>
      </div>
    </div>
  );
};

export default ChallengeDetailReviewItem;
