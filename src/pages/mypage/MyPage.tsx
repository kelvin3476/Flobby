import Title from '@/components/club/text/Title';
import MainHeader from '@/components/header/MainHeader';
import useMainPage from '@/hooks/main/useMainPage';
import React from 'react';
import ProfileInfo from '@/components/mypage/main/ProfileInfo';
import ChallengeNavigator from '@/components/mypage/main/ChallengeNavigator';
import MyChallengeList from '@/components/mypage/main/MyChallengeList';
import { ChallengeSearchItem } from '@/api/ApiTypes';

import '@/styles/mypage/MyPage.scss';

// test용 mock data
const inProgressChallenges: ChallengeSearchItem[] = [
  {
    challengeId: 1,
    challengeName: '아침 6시 기상 챌린지 같이 도전해요',
    mainCategory: '자기계발',
    subCategory: '스터디',
    maxMember: 10,
    currentMember: 3,
    regionId: 101,
    regionName: '강남구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-10-01',
    recruitDday: '모집 D-7',
    wishCount: 12,
    recruitFlag: true,
    createdAt: '2025-09-01T09:00:00Z',
  },
  {
    challengeId: 2,
    challengeName: '퇴근 후 5km 러닝',
    mainCategory: '스포츠',
    subCategory: '달리기',
    maxMember: 10,
    currentMember: 2,
    regionId: 102,
    regionName: '서초구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-10-05',
    recruitDday: '모집 D-11',
    wishCount: 25,
    recruitFlag: true,
    createdAt: '2025-09-02T12:30:00Z',
  },
  {
    challengeId: 3,
    challengeName: '매일 1시간 책 읽기',
    mainCategory: '자기계발',
    subCategory: '독서',
    maxMember: 20,
    currentMember: 7,
    regionId: 103,
    regionName: '마포구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-09-30',
    recruitDday: '모집 D-6',
    wishCount: 40,
    recruitFlag: true,
    createdAt: '2025-09-05T08:10:00Z',
  },
  {
    challengeId: 4,
    challengeName: '주 3회 헬스장 가기',
    mainCategory: '스포츠',
    subCategory: '헬스',
    maxMember: 20,
    currentMember: 15,
    regionId: 104,
    regionName: '송파구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-10-03',
    recruitDday: '모집 D-9',
    wishCount: 18,
    recruitFlag: true,
    createdAt: '2025-09-07T10:00:00Z',
  },
  {
    challengeId: 5,
    challengeName: '주말 자전거 라이딩',
    mainCategory: '스포츠',
    subCategory: '자전거',
    maxMember: 25,
    currentMember: 20,
    regionId: 105,
    regionName: '관악구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-10-10',
    recruitDday: '모집 D-16',
    wishCount: 33,
    recruitFlag: true,
    createdAt: '2025-09-10T07:30:00Z',
  },
  {
    challengeId: 6,
    challengeName: '하루 10분 명상',
    mainCategory: '자기계발',
    subCategory: '명상',
    maxMember: 15,
    currentMember: 12,
    regionId: 106,
    regionName: '동작구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-09-29',
    recruitDday: '모집 D-5',
    wishCount: 21,
    recruitFlag: true,
    createdAt: '2025-09-12T15:00:00Z',
  },
  {
    challengeId: 7,
    challengeName: '매일 영어 회화 30분',
    mainCategory: '자기계발',
    subCategory: '영어',
    maxMember: 20,
    currentMember: 17,
    regionId: 107,
    regionName: '용산구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-10-02',
    recruitDday: '모집 D-8',
    wishCount: 29,
    recruitFlag: true,
    createdAt: '2025-09-15T13:00:00Z',
  },
  {
    challengeId: 8,
    challengeName: '매일 아침 요가 스트레칭',
    mainCategory: '스포츠',
    subCategory: '요가',
    maxMember: 30,
    currentMember: 26,
    regionId: 108,
    regionName: '종로구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-10-06',
    recruitDday: '모집 D-12',
    wishCount: 37,
    recruitFlag: true,
    createdAt: '2025-09-18T09:40:00Z',
  },
];

const completedChallenges: ChallengeSearchItem[] = [
  {
    challengeId: 101,
    challengeName: '8월 아침 기상 챌린지',
    mainCategory: '자기계발',
    subCategory: '스터디',
    maxMember: 10,
    currentMember: 8,
    regionId: 201,
    regionName: '강서구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-08-31',
    recruitDday: '모집 마감',
    wishCount: 14,
    recruitFlag: false,
    createdAt: '2025-08-01T09:00:00Z',
  },
  {
    challengeId: 102,
    challengeName: '여름 방학 독서 챌린지',
    mainCategory: '자기계발',
    subCategory: '독서',
    maxMember: 8,
    currentMember: 4,
    regionId: 202,
    regionName: '성북구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-08-15',
    recruitDday: '모집 마감',
    wishCount: 19,
    recruitFlag: false,
    createdAt: '2025-07-20T08:10:00Z',
  },
  {
    challengeId: 103,
    challengeName: '여름철 다이어트 런닝',
    mainCategory: '스포츠',
    subCategory: '달리기',
    maxMember: 20,
    currentMember: 18,
    regionId: 203,
    regionName: '노원구',
    photoUrl: '/img/main/club/thumbnail1.png',
    recruitEndDate: '2025-08-20',
    recruitDday: '모집 마감',
    wishCount: 22,
    recruitFlag: false,
    createdAt: '2025-07-25T07:30:00Z',
  },
];

const MyPage = () => {
  const { accessToken } = useMainPage();
  return (
    <div className="mypage-wrapper">
      <MainHeader accessToken={accessToken} />
      <div className="mypage-content-container">
        <Title titleName="마이페이지" className="my-page-title" />
        <div className="mypage-info-container">
          <div className="mypage-header">
            <ProfileInfo />
            <ChallengeNavigator />
          </div>
          <div className="mypage-challenge-box">
            <MyChallengeList
              challengeType="progress"
              challengeList={inProgressChallenges.slice(0, 5)}
            />
            <MyChallengeList
              challengeType="completed"
              challengeList={completedChallenges.slice(0, 5)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
