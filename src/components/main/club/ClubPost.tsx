import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Button from '../../button/Button';

import ClubItem from './ClubItem';

import logger from '../../../utils/Logger';

import { clubItem, MainData } from '../../../api/ApiTypes';
import { RegionContextController } from '../../../services/region/controllers/RegionContextController';
import { ClubController } from '../../../services/club/controllers/ClubController';

import '../../../styles/main/club/ClubPost.scss';

interface ClubPostProps {
  mainDataList: MainData;
  setMainDataList: React.Dispatch<React.SetStateAction<MainData>>;
}

const ClubPost: React.FC<ClubPostProps> = ({ mainDataList, setMainDataList }: ClubPostProps) => {
  const [clubData, setClubData] = React.useState<clubItem[]>([]);
  const regionContextController = RegionContextController.getInstance();
  const clubController = ClubController.getInstance();

  React.useEffect(() => {
    /* 최초 화면 진입 후 렌더링 시 호출 */
    setMainDataList(mainDataList);
    /* 초기 모임 데이터 설정 */
    setClubData([...mainDataList.clubItems]);
  }, [mainDataList]);

  React.useEffect(() => {
    /* 지역 변경 이벤트 핸들러 */
    const handleRegionChange = () => {
      regionContextController.getMainData()
        .then((mainData: MainData) => {
          setMainDataList(mainData);
          setClubData([...mainData.clubItems]);
        })
        .catch((error) => {
          logger.error('모임 데이터 업데이트 실패:', error);
        })
    };

    window.addEventListener('regionChanged', handleRegionChange);

    return () => {
      window.removeEventListener('regionChanged', handleRegionChange);
    };
  }, []);

  React.useEffect(() => {
    const handleSearch = async (event: CustomEvent) => {
      const searchKeyword = event.detail.searchKeyword;
      if (searchKeyword) {
        const clubListData = await clubController.searchClubList(searchKeyword);
        setClubData(clubListData);
      } else {
        setClubData([...mainDataList.clubItems]);
      }
    };

    window.addEventListener('clubSearch', handleSearch);

    return () => {
      window.removeEventListener('clubSearch', handleSearch);
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
          onClick={() => navigate('/club/list')}
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
