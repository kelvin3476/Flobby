import { GetChallengeDetailResponse } from '@/api/ApiTypes';
import ChallengeDetailRecommend from '@/components/challenge/detail/ChallengeDetailRecommend';
import ChallengeDetailReview from '@/components/challenge/detail/ChallengeDetailReview';
import { ChallengeController } from '@/services/challenge/controllers/ChallengeController';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ChallengeDetail = () => {
  const { challengeId } = useParams<{ challengeId }>();
  const [challengeDetail, setChallengeDetail] =
    useState<GetChallengeDetailResponse | null>(null);
  const challengeController = ChallengeController.getInstance();

  useEffect(() => {
    const fetchChallengeDetail = async () => {
      const challengeDetail =
        await challengeController.getChallengeDetail(challengeId);
      setChallengeDetail(challengeDetail);
    };
    fetchChallengeDetail();
  }, [challengeId]);

  return (
    <>
      챌린지 상세 페이지
      <ChallengeDetailReview
        challengeId={challengeId}
        challengeDetailReview={challengeDetail?.reviews}
      />
      <ChallengeDetailRecommend
        recommendChallenges={challengeDetail?.recommendChallenges}
      />
    </>
  );
};

export default ChallengeDetail;
