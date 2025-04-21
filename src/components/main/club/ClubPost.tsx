import React from 'react';
import { useNavigate } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Button from '../../button/Button';

import ClubItem from './ClubItem';

import { clubItem } from '../../../api/ApiTypes';

import '../../../styles/main/club/ClubPost.scss';

/* TODO: 메인 페이지 api 및 지역 변경 api 데이터에 따라 실제 백엔드 응답 데이터로 교체 예정 */
const dummyData: clubItem[] = [
  {
    category: '운동',
    scale: '소모임',
    clubName: '배드민턴 동호회',
    location: '강남구',
    currentMembers: 5,
    imageUrl: '/img/main/club/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    scale: '대규모',
    clubName: '영어 회화 모임',
    location: '종로구',
    currentMembers: 50,
    imageUrl: '/img/main/club/thumbnail2.png',
  },
  {
    category: '취미',
    scale: '소모임',
    clubName: '사진 촬영 동호회',
    location: '마포구',
    currentMembers: 10,
    imageUrl: '/img/main/club/thumbnail1.png',
  },
  {
    category: '문화/예술',
    scale: '대규모',
    clubName: '영화 감상 모임',
    location: '용산구',
    currentMembers: 100,
    imageUrl: '/img/main/club/thumbnail2.png',
  },
  {
    category: '운동',
    scale: '소모임',
    clubName: '요가 동호회',
    location: '송파구',
    currentMembers: 8,
    imageUrl: '/img/main/club/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    scale: '대규모',
    clubName: '프랑스어 회화 모임',
    location: '성동구',
    currentMembers: 30,
    imageUrl: '/img/main/club/thumbnail2.png',
  },
  {
    category: '취미',
    scale: '소모임',
    clubName: '독서 동호회',
    location: '강서구',
    currentMembers: 12,
    imageUrl: '/img/main/club/thumbnail1.png',
  },
  {
    category: '문화/예술',
    scale: '대규모',
    clubName: '음악 감상 모임',
    location: '서초구',
    currentMembers: 80,
    imageUrl: '/img/main/club/thumbnail2.png',
  },
  {
    category: '운동',
    scale: '소모임',
    clubName: '자전거 동호회',
    location: '관악구',
    currentMembers: 15,
    imageUrl: '/img/main/club/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    scale: '대규모',
    clubName: '일본어 회화 모임',
    location: '강북구',
    currentMembers: 40,
    imageUrl: '/img/main/club/thumbnail2.png',
  },
];

const ClubPost = () => {
  const navigate = useNavigate();
  const checkClubItemsLength = dummyData.length > 4;

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
        <span>동호회 둘러보기</span>
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
            checkClubItemsLength
              ? {
                  prevEl: '.club-custom-prev',
                  nextEl: '.club-custom-next',
                }
              : false
          }
          modules={[Navigation]}
        >
          {dummyData.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                <ClubItem
                  key={idx}
                  category={item.category}
                  scale={item.scale}
                  clubName={item.clubName}
                  location={item.location}
                  currentMembers={item.currentMembers}
                  imageUrl={item.imageUrl}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {checkClubItemsLength && (
          <div className="club-navigation-wrapper">
            <div className="club-custom-prev"></div>
            <div className="club-custom-next"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubPost;
