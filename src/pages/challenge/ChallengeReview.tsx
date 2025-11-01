import React, { useEffect, useState } from 'react';
import useMainPage from '@/hooks/main/useMainPage';
import MainHeader from '@/components/header/MainHeader';

import '@/styles/challenge/review/ChallengeReview.scss';
import { ChallengeController } from '@/services/challenge/controllers/ChallengeController';
import { useParams } from 'react-router-dom';
import { GetChallengeReviewResponse } from '@/api/ApiTypes';
import ChallengeReviewItem from '@/components/challenge/review/ChallengeReviewItem';

// interface ChallengeReviewProps {
//   title: string;
// }

const ChallengeReview = () => {
  const { accessToken } = useMainPage();
  const { challengeId } = useParams<{ challengeId }>();
  const [challengeReviewList, setChallengeReviewList] = useState<
    GetChallengeReviewResponse[]
  >([]);
  const [challengeTitle, setChallengeTitle] = useState<string>('');

  const challengeController = ChallengeController.getInstance();

  const fetchChallengeReview = async () => {
    const reviewListData =
      await challengeController.getChallengeReview(challengeId);

    setChallengeReviewList(reviewListData);
  };

  // challenge title
  const fetchChallengeDetailForTitle = async () => {
    const challengeDetailData =
      await challengeController.getChallengeDetail(challengeId);
    setChallengeTitle(challengeDetailData.recruitThumnail.title);
  };

  useEffect(() => {
    fetchChallengeReview();
    fetchChallengeDetailForTitle();
  }, []);

  return (
    <div className="challenge-review-wrapper">
      <MainHeader accessToken={accessToken} />

      <div className="challenge-review-list-wrapper">
        <div className="challenge-review-list-title">
          <span>{challengeTitle}</span>
          <span>후기</span>
        </div>

        {challengeReviewList.map((review, idx) => {
          return (
            <div className="challenge-review-list-item-box" key={idx}>
              {idx !== 0 && (
                <div className="challenge-review-list-item-divider"></div>
              )}
              <ChallengeReviewItem challengeReviewItem={review} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeReview;
