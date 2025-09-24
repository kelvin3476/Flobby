import Title from '@/components/club/text/Title';
import MainHeader from '@/components/header/MainHeader';
import useMainPage from '@/hooks/main/useMainPage';
import React from 'react';
import '@/styles/mypage/mypage.scss';
import ProfileInfo from '@/components/mypage/main/ProfileInfo';
import ChallengeTabs from '@/components/mypage/main/ChallengeTabs';
import ChallengeListBox from '@/components/mypage/main/ChallengeListBox';

const MyPage = () => {
  const { accessToken } = useMainPage();
  return (
    <div className="mypage-wrapper">
      <MainHeader accessToken={accessToken} />
      <div className="mypage-content-container">
        <Title titleName="마이페이지" />
        <div className="mypage-header">
          <ProfileInfo />
          <ChallengeTabs />
        </div>
        <div className="mypage-challenge-box">
          <ChallengeListBox />
          <ChallengeListBox />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
