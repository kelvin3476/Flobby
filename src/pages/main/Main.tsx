import React from 'react';

import logger from '../../utils/Logger';

import MainHeader from '../../components/header/MainHeader';
import CarouselBanner from '../../components/carousel/CarouselBanner';
import ClubPost from '../../components/main/club/ClubPost';
import OnedayPost from '../../components/main/one_day/OnedayPost';
import PopularPost from '../../components/main/popular_post/PopularPost';

import useMainPage from '../../hooks/main/useMainPage';

import { MainDataController } from '../../services/main/controllers/MainDataController';
import { MainData } from '../../api/ApiTypes';

import '../../styles/main/Main.scss';

const Main = () => {
  const mainDataController = MainDataController.getInstance();

  const { accessToken, mainDataList, setMainDataList } = useMainPage();

  React.useEffect(() => {
    const fetchMainData = async () => {
      try {
        const mainData: MainData = await mainDataController.getMainData();
        setMainDataList(mainData);
      } catch (error) {
        logger.error('메인 데이터 가져오기 실패:', error);
      }
    };

    fetchMainData();
  }, []);

  return (
    <div className="responsive-container">
      <main>
        <MainHeader accessToken={accessToken} />
        <CarouselBanner />
        <ClubPost mainDataList={mainDataList} setMainDataList={setMainDataList} />
        <OnedayPost mainDataList={mainDataList} setMainDataList={setMainDataList} />
        <PopularPost mainDataList={mainDataList} setMainDataList={setMainDataList} />
      </main>
    </div>
  );
};

export default Main;
