import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Button from '../../button/Button';

import OnedayItem from './OnedayItem';

import { onedayItem, MainData, RegionItem } from '../../../api/ApiTypes';
import { RegionContextController } from "../../../services/region/controllers/RegionContextController";

import '../../../styles/main/one_day/OnedayPost.scss';

const OnedayPost = () => {
  const [ onedayData, setOnedayData ] = React.useState<onedayItem[]>([]);
  const regionContextController: RegionContextController = RegionContextController.getInstance();

  const fetchOnedayData = async () => {
    const data: MainData = await regionContextController.getMainData();
    setOnedayData([...data.onedayItems]);
  };

  React.useEffect(() => {
    /* 최초 화면 진입 후 렌더링 시 호출 */
    fetchOnedayData();

    /* 지역 변경 이벤트 핸들러 */
    const handleRegionChange = async (event: CustomEvent<RegionItem>) => {
      await fetchOnedayData();
    };

    window.addEventListener('regionChanged', handleRegionChange);

    return () => {
      window.removeEventListener('regionChanged', handleRegionChange);
    };
  }, []);

  const navigate = useNavigate();

  const changeSwiperAction = swiper => {
    const prevButton = document.querySelector('.one-day-custom-prev');
    const nextButton = document.querySelector('.one-day-custom-next');

    /* 최초 스와이퍼 렌더링시 이전 버튼 비활성화 */
    if (swiper.isBeginning) {
      prevButton.classList.add('disabled');
    }

    swiper.on('slideChange', () => {
      /* 처음 시작 슬라이드인 경우 */
      if (swiper.isBeginning) {
        prevButton.classList.add('disabled');
      } else {
        prevButton.classList.remove('disabled');
      }

      /* 마지막 슬라이드인 경우 */
      if (swiper.isEnd) {
        nextButton.classList.add('disabled');
      } else {
        nextButton.classList.remove('disabled');
      }
    });
  };

  return (
    <div className="one-day-post-container">
      <div className="one-day-post-title">
        <span>원데이 둘러보기</span>
        <Button
          type="button"
          className="one-day-overall-button"
          title="전체보기"
          onClick={() => navigate('/oneday/all')}
        />
      </div>
      <div className="swiper-container">
        {onedayData.length > 0 && (
          <>
            <Swiper
              key={onedayData.length}
              onSwiper={changeSwiperAction} /* Swiper 인스턴스를 받아와서 처리 */
              slidesPerView={4}
              spaceBetween={24}
              navigation={
                {
                  prevEl: '.one-day-custom-prev',
                  nextEl: '.one-day-custom-next',
                }
              }
              modules={[Navigation]}
            >
              {onedayData.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <OnedayItem
                      key={idx}
                      category={item.category}
                      title={item.title}
                      locationName={item.locationName}
                      currentMembers={item.currentMembers}
                      maxMembers={item.maxMembers}
                      scheduledDate={item.scheduledDate}
                      nickname={item.nickname}
                      hostId={item.hostId}
                      profilePhoto={item.profilePhoto}
                      imageUrl={item.imageUrl}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="one-day-navigation-wrapper">
              <div className="one-day-custom-prev"></div>
              <div className="one-day-custom-next"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OnedayPost;