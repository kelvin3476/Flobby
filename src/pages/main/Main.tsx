import React from 'react';

import logger from '../../utils/Logger';

import MainHeader from '../../components/header/MainHeader';
import CarouselBanner from '../../components/carousel/CarouselBanner';
import ClubPost from '../../components/main/club/ClubPost';
import OnedayPost from "../../components/main/one_day/OnedayPost";
import PopularPost from '../../components/main/popular_post/PopularPost';

import useMainPage from '../../hooks/main/useMainPage';

const Main = () => {
  const {
    accessToken,
  } = useMainPage();

  logger.log('[accessToken]', accessToken);

  return (
    <main>
      {/*
                TODO: 메인 페이지 컴포넌트에 각자 작업한 컴포넌트 병합 작업 필요
                      메인 페이지 헤더 부분 작업 (연지)
                      병합 후 포지셔닝 작업 필요 (지민)
                      포지셔닝 작업 후 반응형 작업 필요 (승우)
             */}
      <MainHeader />
      <CarouselBanner />
      <ClubPost />
      <OnedayPost />
      <PopularPost />
    </main>
  );
};

export default Main;
