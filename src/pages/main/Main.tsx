import React from 'react';

import RegionSelector from '../../components/main/region_selector/RegionSelector';
import CarouselBanner from '../../components/carousel/CarouselBanner';
import ClubPost from '../../components/main/club/ClubPost';
import PopularPost from '../../components/main/popular_post/PopularPost';

const Main = () => {
  return (
    <main>
      {/*
                TODO: 메인 페이지 컴포넌트에 각자 작업한 컴포넌트 병합 작업 필요
                      메인 페이지 헤더 부분 작업 및 병합 후 포지셔닝 작업 필요 (연지)
                      포지셔닝 작업 후 반응형 작업 필요 (승우)
             */}
      <CarouselBanner />
      <ClubPost />
      <PopularPost />
    </main>
  );
};

export default Main;
