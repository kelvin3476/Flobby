import React, { useEffect, useState } from 'react';
import logger from '@/utils/Logger';
import { useNavigate } from 'react-router-dom';
import MainHeader from '@/components/header/MainHeader';
import MainCategory from '@/components/challenge/list/MainCategory';
import Title from '@/components/club/text/Title';
import SubCategory from '@/components/challenge/list/SubCategory';
import ChallengeList from '@/components/challenge/list/ChallengeList';
import FloatingButton from '@/components/button/FloatingButton';
import useMainPage from '@/hooks/main/useMainPage';
import useClubCategoryStore from '@/store/club/useClubCategoryStore';
import { CategoryListController } from '@/services/category/controllers/CategoryListController';
import { ChallengeController } from '@/services/challenge/controllers/ChallengeController';
import { ChallengeItemType, HobbyCategory } from '@/api/ApiTypes';
import { setCookie } from '@/utils/Cookie';
import FabDefaultIcon from '@/assets/svg/club/clublist/floating_button_default.svg';
import FabDefaultCancelIcon from '@/assets/svg/club/clublist/floating_button_default_cancel.svg';
import FabClubRegisterIcon from '@/assets/svg/club/clublist/floating_button_club_register.svg';
import FabOnedayRegisterIcon from '@/assets/svg/club/clublist/floating_button_oneday_register.svg';
import { ModalRegionListController } from '@/services/region/controllers/ModalRegionListController';

import '@/styles/main/club/ChallengeAll.scss';

const testChallengeList: ChallengeItemType[] = [
  {
    challengeId: 1,
    challengeName: '출근 전 5km 러닝 챌린지',
    mainCategory: '스포츠',
    subCategory: '러닝',
    maxMember: 50,
    currentMember: 41,
    regionId: 1,
    regionName: '서울',
    photoUrl: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74',
    recruitEndDate: '2025-10-12',
    recruitDday: 'D-4',
    wishCount: 92,
  },
  {
    challengeId: 2,
    challengeName: '주말 테니스 모임',
    mainCategory: '스포츠',
    subCategory: '테니스',
    maxMember: 20,
    currentMember: 18,
    regionId: 2,
    regionName: '부산',
    photoUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07d',
    recruitEndDate: '2025-10-18',
    recruitDday: 'D-10',
    wishCount: 58,
  },
  {
    challengeId: 3,
    challengeName: '가을 단풍 등산 챌린지',
    mainCategory: '여행',
    subCategory: '등산',
    maxMember: 30,
    currentMember: 24,
    regionId: 3,
    regionName: '대구',
    photoUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    recruitEndDate: '2025-10-25',
    recruitDday: 'D-17',
    wishCount: 66,
  },
  {
    challengeId: 4,
    challengeName: '주말 캠핑 동호회',
    mainCategory: '여행',
    subCategory: '캠핑',
    maxMember: 25,
    currentMember: 21,
    regionId: 4,
    regionName: '강릉',
    photoUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c',
    recruitEndDate: '2025-10-11',
    recruitDday: 'D-3',
    wishCount: 73,
  },
  {
    challengeId: 5,
    challengeName: '버스킹 공연 준비 팀',
    mainCategory: '음악',
    subCategory: '밴드',
    maxMember: 10,
    currentMember: 9,
    regionId: 5,
    regionName: '인천',
    photoUrl: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc',
    recruitEndDate: '2025-10-20',
    recruitDday: 'D-12',
    wishCount: 42,
  },
  {
    challengeId: 6,
    challengeName: '노래 실력 업! 보컬 트레이닝',
    mainCategory: '음악',
    subCategory: '노래·보컬',
    maxMember: 15,
    currentMember: 12,
    regionId: 6,
    regionName: '수원',
    photoUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    recruitEndDate: '2025-10-09',
    recruitDday: 'D-1',
    wishCount: 39,
  },
  {
    challengeId: 7,
    challengeName: '하루 한 장 드로잉 챌린지',
    mainCategory: '예술',
    subCategory: '드로잉',
    maxMember: 40,
    currentMember: 37,
    regionId: 7,
    regionName: '대전',
    photoUrl: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0',
    recruitEndDate: '2025-10-22',
    recruitDday: 'D-14',
    wishCount: 61,
  },
  {
    challengeId: 8,
    challengeName: '캔들 공방 클래스',
    mainCategory: '예술',
    subCategory: '캔들·디퓨저·석고',
    maxMember: 12,
    currentMember: 10,
    regionId: 8,
    regionName: '광주',
    photoUrl: 'https://images.unsplash.com/photo-1616627981312-2d8fe73a799a',
    recruitEndDate: '2025-10-19',
    recruitDday: 'D-11',
    wishCount: 47,
  },
  {
    challengeId: 9,
    challengeName: '월간 IT 스터디',
    mainCategory: '자기계발',
    subCategory: 'IT',
    maxMember: 30,
    currentMember: 28,
    regionId: 9,
    regionName: '성남',
    photoUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    recruitEndDate: '2025-10-17',
    recruitDday: 'D-9',
    wishCount: 80,
  },
  {
    challengeId: 10,
    challengeName: '마케팅 실전 케이스 스터디',
    mainCategory: '자기계발',
    subCategory: '마케팅',
    maxMember: 20,
    currentMember: 19,
    regionId: 10,
    regionName: '제주',
    photoUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2',
    recruitEndDate: '2025-10-28',
    recruitDday: 'D-20',
    wishCount: 55,
  },
];

const ChallengeAll = () => {
  const navigate = useNavigate();
  const { accessToken, mainDataList, setMainDataList } = useMainPage();
  logger.log('[ChallengeAll: accessToken]', accessToken);

  // 지역 컨트롤러
  const regionController = ModalRegionListController.getInstance();

  logger.log(
    '[ChallengeAll: selectedRegion]',
    regionController.model.selectedRegion,
  );

  const { mainCategory, setMainCategory, subCategory, setSubCategory } =
    useClubCategoryStore();
  const [categoryList, setCategoryList] = useState<HobbyCategory[]>([]);
  const [challengeList, setChallengeList] = useState<
    ChallengeItemType[] | null
  >([]);
  const [title, setTitle] = useState<string>(
    `${regionController.model.selectedRegion.regionName} 챌린지`,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  logger.log('[ChallengeAll: mainCategory]', mainCategory);
  logger.log('[ChallengeAll: subCategory]', subCategory);

  // 카테고리 목록 컨트롤러
  const categoryListController = CategoryListController.getInstance();

  useEffect(() => {
    /* 초기 메인 데이터 저장 (메인 헤더)  */
    setMainDataList(mainDataList);
    const fetchCategoryListData = async () => {
      try {
        const categoryListData = await categoryListController.getCategoryList();
        const processedCategoryListData = [
          { mainCategory: '전체', subCategories: [] },
          ...categoryListData,
        ];
        setCategoryList(processedCategoryListData);
      } catch (error) {
        console.error('카테고리 데이터 가져오기 실패', error);
      }
    };
    fetchCategoryListData();
  }, [mainDataList]);

  // 모임 목록 컨트롤러
  const challengeController = ChallengeController.getInstance();

  const fetchChallengeItemList = async () => {
    setIsLoading(true);
    if (!mainCategory || mainCategory === '전체') {
      const challengeListData = await challengeController.getChallengeList();
      setChallengeList(challengeListData);
    } else {
      const challengeListData = await challengeController.getChallengeList(
        encodeURIComponent(mainCategory),
      );
      setChallengeList(challengeListData);
    }
    setIsLoading(false);
  };

  // 카테고리 값 변경 시 모임 목록 업데이트
  useEffect(() => {
    fetchChallengeItemList();
  }, [mainCategory, subCategory]);

  // 지역 변경 시 모임 목록 업데이트
  useEffect(() => {
    const handleRegionChange = () => {
      fetchChallengeItemList();
    };

    window.addEventListener('regionChanged', handleRegionChange);
    return () => {
      window.removeEventListener('regionChanged', handleRegionChange);
    };
  }, []);

  useEffect(() => {
    let newTitle = '';
    if (mainCategory === '전체') {
      newTitle = `${regionController.model.selectedRegion.regionName} 챌린지`;
      setTitle(newTitle);
    } else {
      newTitle = `${regionController.model.selectedRegion.regionName} ${mainCategory} 챌린지`;
      setTitle(newTitle);
    }
  }, [regionController.model.selectedRegion, mainCategory]);

  // 페이지 진입 시 카테고리 상태 및 쿠키 초기화
  useEffect(() => {
    setMainCategory('전체');
    setSubCategory('');
    setCookie('mainCategory', '전체');
    setCookie('subCategory', '', 0);
  }, []);

  return (
    <div className="challenge-all-wrapper">
      <MainHeader accessToken={accessToken} />
      <div className="challenge-all-content-container">
        <MainCategory categoryList={categoryList} />
        <div className="challenge-all-content">
          <Title titleName={title} />
          <div className="challenge-all-sub-content">
            <SubCategory categoryList={categoryList} />
            <ChallengeList
              // challengeList={challengeList}
              challengeList={testChallengeList}
              accessToken={accessToken}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      {accessToken && (
        <FloatingButton
          mainDefaultIcon={FabDefaultIcon}
          mainActionIcon={FabDefaultCancelIcon}
          options={[
            {
              icon: FabClubRegisterIcon,
              label: '모임 등록',
              onClick: () => navigate('/club/register'),
            },
            {
              icon: FabOnedayRegisterIcon,
              label: '원데이 등록',
              onClick: () => navigate('/oneday/register'),
            },
          ]}
        />
      )}
    </div>
  );
};

export default ChallengeAll;
