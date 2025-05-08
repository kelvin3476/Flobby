import React from 'react';

import logger from '../../utils/Logger';

import MainHeader from '../../components/header/MainHeader';
import CarouselBanner from '../../components/carousel/CarouselBanner';
import ClubPost from '../../components/main/club/ClubPost';
import OnedayPost from '../../components/main/one_day/OnedayPost';
import PopularPost from '../../components/main/popular_post/PopularPost';

import useMainPage from '../../hooks/main/useMainPage';

import '../../styles/main/Main.scss';

const Main = () => {
  const { accessToken } = useMainPage();

  logger.log('[accessToken]', accessToken);

  return (
    <div className="responsive-container">
      <main>
        <MainHeader />
        <CarouselBanner />
        <ClubPost />
        <OnedayPost />
        <PopularPost />
      </main>
    </div>
  );
};

export default Main;
