import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Button from '../../button/Button';

import ClubItem from './ClubItem';

import { clubItem, MainData } from '../../../api/ApiTypes';
import { RegionContextController } from '../../../services/main/controllers/RegionContextController';

import '../../../styles/main/club/ClubPost.scss';

const ClubPost: React.FC = () => {
  const [ clubData, setClubData ] = React.useState<clubItem[]>([]);
  const regionContextController: RegionContextController = RegionContextController.getInstance();

  React.useEffect(() => {
    regionContextController.getMainData().then((item: MainData) => {
      const clubData: clubItem[] = [...item.clubItems];
      setClubData(clubData);
    });
  }, []);

  const navigate = useNavigate();

  const changeSwiperAction = swiper => {
    const prevButton = document.querySelector('.club-custom-prev');
    const nextButton = document.querySelector('.club-custom-next');

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
    <div className="club-post-container">
      <div className="club-post-title">
        <span>모임 둘러보기</span>
        <Button
          type="button"
          className="club-overall-button"
          title="전체 보기"
          onClick={() => navigate('/main/club-all')}
        />
      </div>
      <div className="swiper-container">
        <Swiper
          onSwiper={changeSwiperAction} /* Swiper 인스턴스를 받아와서 처리 */
          slidesPerView={4}
          spaceBetween={24}
          navigation={
            {
              prevEl: '.club-custom-prev',
              nextEl: '.club-custom-next',
            }
          }
          modules={[Navigation]}
        >
          {clubData.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                <ClubItem
                  key={idx}
                  category={item.category}
                  scale={item.scale}
                  clubName={item.clubName}
                  locationName={item.locationName}
                  currentMembers={item.currentMembers}
                  imageUrl={item.imageUrl}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="club-navigation-wrapper">
          <div className="club-custom-prev"></div>
          <div className="club-custom-next"></div>
        </div>
      </div>
    </div>
  );
};

export default ClubPost;
