import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Button from '../../button/Button';

import OnedayItem from './OnedayItem';

import { onedayItem } from '../../../api/ApiTypes';

import '../../../styles/main/one_day/OnedayPost.scss';

/* TODO: 메인 페이지 api 데이터에 따라 실제 백엔드 응답 데이터로 교체 예정 */
const dummyData: onedayItem[] = [
  {
    category: '언어/외국어',
    title: '영어 스터디 함께 해요.',
    location: '송파구',
    currentMembers: 3,
    maxMembers: 10,
    scheduledDate: '02.04',
    nickname: '홍길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    title: '중국어 스터디 함께 해요.',
    location: '강남구',
    currentMembers: 4,
    maxMembers: 10,
    scheduledDate: '02.05',
    nickname: '고길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail2.png',
  },
  {
    category: '언어/외국어',
    title: '일본어 스터디 함께 해요.',
    location: '마포구',
    currentMembers: 5,
    maxMembers: 10,
    scheduledDate: '02.06',
    nickname: '홍길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    title: '한국어 스터디 함께 해요.',
    location: '서초구',
    currentMembers: 6,
    maxMembers: 10,
    scheduledDate: '02.07',
    nickname: '고길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail2.png',
  },
  {
    category: '언어/외국어',
    title: '스페인어 스터디 함께 해요.',
    location: '관악구',
    currentMembers: 7,
    maxMembers: 10,
    scheduledDate: '02.08',
    nickname: '홍길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    title: '독일어 스터디 함께 해요.',
    location: '미추홀구',
    currentMembers: 8,
    maxMembers: 10,
    scheduledDate: '02.09',
    nickname: '고길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail2.png',
  },
  {
    category: '언어/외국어',
    title: '러시아어 스터디 함께 해요.',
    location: '광진구',
    currentMembers: 9,
    maxMembers: 10,
    scheduledDate: '02.10',
    nickname: '홍길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    title: '로마어 스터디 함께 해요.',
    location: '종로구',
    currentMembers: 10,
    maxMembers: 10,
    scheduledDate: '02.11',
    nickname: '고길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail2.png',
  },
  {
    category: '언어/외국어',
    title: '필리핀어 스터디 함께 해요.',
    location: '강서구',
    currentMembers: 1,
    maxMembers: 10,
    scheduledDate: '02.12',
    nickname: '홍길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail1.png',
  },
  {
    category: '언어/외국어',
    title: '베트남어 스터디 함께 해요.',
    location: '중랑구',
    currentMembers: 2,
    maxMembers: 10,
    scheduledDate: '02.13',
    nickname: '고길동',
    profilePhoto: '/img/main/one_day/profile1.png',
    imageUrl: '/img/main/one_day/thumbnail2.png',
  },
]

const OnedayPost = () => {
  const navigate = useNavigate();
  const checkOnedayItemsLength = dummyData.length > 4;

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
          onClick={() => navigate('/main/one-day-all')}
        />
      </div>
      <div className="swiper-container">
        <Swiper
          onSwiper={changeSwiperAction} /* Swiper 인스턴스를 받아와서 처리 */
          slidesPerView={4}
          spaceBetween={24}
          navigation={
            checkOnedayItemsLength
              ? {
                  prevEl: '.one-day-custom-prev',
                  nextEl: '.one-day-custom-next',
                  }
              : false
          }
          modules={[Navigation]}
        >
          {dummyData.map((item, idx) => {
            return (
              <SwiperSlide key={idx}>
                <OnedayItem
                  key={idx}
                  category={item.category}
                  title={item.title}
                  location={item.location}
                  currentMembers={item.currentMembers}
                  maxMembers={item.maxMembers}
                  scheduledDate={item.scheduledDate}
                  nickname={item.nickname}
                  profilePhoto={item.profilePhoto}
                  imageUrl={item.imageUrl}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        {checkOnedayItemsLength && (
          <div className="one-day-navigation-wrapper">
            <div className="one-day-custom-prev"></div>
            <div className="one-day-custom-next"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnedayPost;