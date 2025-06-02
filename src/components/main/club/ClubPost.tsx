import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Button from '../../button/Button';

import ClubItem from './ClubItem';

import { clubItem, MainData, RegionItem } from '../../../api/ApiTypes';
import { RegionContextController } from '../../../services/region/controllers/RegionContextController';

import '../../../styles/main/club/ClubPost.scss';

const ClubPost: React.FC = () => {
  const [clubData, setClubData] = React.useState<clubItem[]>([]);
  const regionContextController: RegionContextController =
    RegionContextController.getInstance();

  const fetchClubData = async () => {
    const data: MainData = await regionContextController.getMainData();
    setClubData([...data.clubItems]);
  };

  React.useEffect(() => {
    /* 최초 화면 진입 후 렌더링 시 호출 */
    fetchClubData();

    /* 지역 변경 이벤트 핸들러 */
    const handleRegionChange = async (event: CustomEvent<RegionItem>) => {
      await fetchClubData();
    };

    window.addEventListener('regionChanged', handleRegionChange);

    return () => {
      window.removeEventListener('regionChanged', handleRegionChange);
    };
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
          onClick={() => navigate('/club/all')}
        />
      </div>
      <div className="swiper-container">
        {clubData.length > 0 && (
          <>
            <Swiper
              key={clubData.length}
              onSwiper={
                changeSwiperAction
              } /* Swiper 인스턴스를 받아와서 처리 */
              slidesPerView={4}
              spaceBetween={24}
              navigation={{
                prevEl: '.club-custom-prev',
                nextEl: '.club-custom-next',
              }}
              modules={[Navigation]}
            >
              {clubData.map((item, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <ClubItem
                      key={idx}
                      clubId={item.clubId}
                      photo={item.photo}
                      hostId={item.hostId}
                      hostNickname={item.hostNickname}
                      category={item.category}
                      maxMember={item.maxMember}
                      clubName={item.clubName}
                      locationName={item.locationName}
                      currentMembers={item.currentMembers}
                      subCategory={item.subCategory}
                      postCategory={item.postCategory}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>

            <div className="club-navigation-wrapper">
              <div className="club-custom-prev"></div>
              <div className="club-custom-next"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ClubPost;
