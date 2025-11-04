import React, { useRef, useState } from 'react';

import '@/styles/challenge/review/ChallengeReviewItem.scss';
import { GetChallengeReviewResponse } from '@/api/ApiTypes';
import {
  ChallengeReviewModal,
  ChallengeReviewModalRef,
} from './ChallengeReviewModal';

interface ChallengeReviewItemProps {
  challengeReviewItem: GetChallengeReviewResponse;
}

const challengeReviewItem = ({
  challengeReviewItem,
}: ChallengeReviewItemProps) => {
  const [isActivekebabBtn, setIsActivekebabBtn] = useState<boolean>(false);
  const [isActiveLikeBtn, setIsActiveLikeBtn] = useState<boolean>(false);
  const modalRef = useRef<ChallengeReviewModalRef>(null);

  return (
    <div className="challenge-review-item-wrapper">
      <div className="challenge-review-item-content-box">
        {/* header */}
        <div className="challenge-review-item-content-header">
          <div className="challenge-review-item-user-profile-box">
            <div className="challenge-review-item-user-profile">
              <img
                className="challenge-review-item-user-profile-img"
                src={
                  challengeReviewItem.profileImageUrl ||
                  '/img/challenge/review/review_user_profile_img.jpg'
                }
                alt="reviewer-profile-img"
              />

              <div className="challenge-review-item-user-profile-info">
                <span className="challenge-review-item-user-profile-nick">
                  {challengeReviewItem.nickname}
                </span>
                <span>·</span>
                <span className="">{challengeReviewItem.seasonNumber}기</span>
              </div>
            </div>

            {/* TODO: 작성일 백엔드에 확인 */}
            <div className="challenge-review-item-created-at">6/23</div>
          </div>

          {/* kebab */}
          <div
            className="challenge-review-item-kebab-icon"
            onClick={() => setIsActivekebabBtn(!isActivekebabBtn)}
          ></div>
          <div
            className={`challenge-review-item-kebab-box ${isActivekebabBtn ? 'isActive' : ''}`}
          >
            <span>후기 신고하기</span>
          </div>
        </div>

        {/* description */}
        <div className="challenge-review-item-description">
          {challengeReviewItem.description}
        </div>

        {/* images */}
        {challengeReviewItem.images.length > 0 && (
          <div className="challenge-review-item-img-box">
            {/* TODO: 팝업 모달 컴포넌트 구현 */}
            {challengeReviewItem.images.map((img, idx) => {
              return (
                <img
                  className="challenge-review-item-img"
                  src={img.imageUrl}
                  key={idx}
                  onClick={() => modalRef.current?.open(img.orderNo)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* likes */}
      <div className="challenge-review-item-like-box">
        <div
          className={`challenge-review-item-like-icon ${isActiveLikeBtn || challengeReviewItem.liked ? 'isActive' : ''}`}
          onClick={() => setIsActiveLikeBtn(!isActiveLikeBtn)}
        ></div>
        <span
          className={`challenge-review-item-like-count ${isActiveLikeBtn || challengeReviewItem.liked ? 'isActive' : ''}`}
        >
          {challengeReviewItem.likeCount}
        </span>
      </div>

      <ChallengeReviewModal
        ref={modalRef}
        images={challengeReviewItem.images}
      />
    </div>
  );
};

export default challengeReviewItem;
