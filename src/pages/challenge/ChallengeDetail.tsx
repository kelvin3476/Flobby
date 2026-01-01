import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import MainHeader from '@/components/header/MainHeader';
import Tab from '@/components/tab/Tab';
import Divider from '@/components/divider/Divider';
import ChallengeRecruitDescription from '@/components/challenge/detail/ChallengeRecruitDescription';
import ChallengeDetailReview from '@/components/challenge/detail/ChallengeDetailReview';
import ChallengeDetailQna from '@/components/challenge/detail/ChallengeDetailQna';
import ChallengeDetailRecommend from '@/components/challenge/detail/ChallengeDetailRecommend';

import useMainPage from '@/hooks/main/useMainPage';

import { GetChallengeDetailResponse } from '@/api/ApiTypes';
import { ChallengeController } from '@/services/challenge/controllers/ChallengeController';

import "@/styles/challenge/detail/ChallengeDetail.scss";

const ChallengeDetail = () => {
  const { challengeId } = useParams<{ challengeId }>();

  const { accessToken } = useMainPage();

  const [currentTab, setCurrentTab] = useState<string>('introduction');
  const [challengeDetail, setChallengeDetail] = useState<GetChallengeDetailResponse | null>(null);

  const tabItems = [
    { label: '소개', key: 'introduction' },
    { label: '후기', key: 'review' },
    { label: 'Q&A', key: 'qna' },
    { label: '추천', key: 'recommend' },
  ];

  const sections = [
    {
      key: 'introduction',
      component: (
        <ChallengeRecruitDescription
          challengeRecruitDescriptionType={challengeDetail?.recruitDescription}
        />
      ),
    },
    {
      key: 'review',
      component: (
        <ChallengeDetailReview
          challengeId={challengeId}
          challengeDetailReview={challengeDetail?.reviews}
        />
      ),
    },
    {
      key: 'qna',
      component: (
        <ChallengeDetailQna
          challengeDetailQuestions={challengeDetail?.questions}
        />
      ),
    },
    {
      key: 'recommend',
      component: (
        <ChallengeDetailRecommend
          recommendChallenges={challengeDetail?.recommendChallenges}
        />
      ),
    },
  ];

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
    <div className="challenge-detail-wrapper">
      {/* 메인 헤더 */}
      <MainHeader accessToken={accessToken} />

      {/* 챌린지 상세 컨테이너 */}
      <div className="challenge-detail-container">
        {/* 탭 */}
        <Tab tabs={tabItems} currentTab={currentTab} onTabChange={setCurrentTab} />

        {/* 챌린지 상세 컨텐츠 */}
        <div className="challenge-detail-content">
          {sections.map((section, index) => (
            <React.Fragment key={section.key}>
              {section.component}

              {/* 마지막 요소가 아닐 때만 Divider 렌더링 */}
              {index !== sections.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetail;
