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
import FabDefaultIcon from '@/assets/svg/club/clublist/floating_button_default.svg';
import FabDefaultCancelIcon from '@/assets/svg/club/clublist/floating_button_default_cancel.svg';
import FabClubRegisterIcon from '@/assets/svg/club/clublist/floating_button_club_register.svg';
import FabOnedayRegisterIcon from '@/assets/svg/club/clublist/floating_button_oneday_register.svg';
import { ModalRegionListController } from '@/services/region/controllers/ModalRegionListController';
import Button from '@/components/button/Button';

import '@/styles/main/club/ChallengeAll.scss';

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
  const [selectedRegion, setSelectedRegion] = useState(
    regionController.model.selectedRegion,
  );
  const [title, setTitle] = useState<string>(
    `${regionController.model.selectedRegion.regionName} 챌린지`,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecruiting, setIsRecruiting] = useState<string>('N');

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

    const challengeListData = await challengeController.getChallengeList(
      isRecruiting,
      mainCategory,
      subCategory,
    );

    setChallengeList(challengeListData);

    setIsLoading(false);
  };

  // 카테고리 값 변경 시 모임 목록 업데이트
  useEffect(() => {
    fetchChallengeItemList();
  }, [mainCategory, subCategory, isRecruiting]);

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
    const updateTitle = () => {
      const { selectedRegion } = regionController.model;

      // 메인 카테고리가 '전체'일 경우, 메인 카테고리가 선택되었을 경우 분기
      const newTitle =
        mainCategory === '전체'
          ? `${selectedRegion.regionName} 챌린지`
          : `${selectedRegion.regionName} ${mainCategory} 챌린지`;

      logger.log('지역 변경', selectedRegion.regionName);
      setTitle(newTitle);
    };

    if (regionController.model.initialized) {
      // 지역 데이터가 이미 초기화된 경우 -> 즉시 타이틀 업데이트
      updateTitle();
    } else {
      // 아직 초기화되지 않은 경우 -> regionReady 이벤트가 발생하면 타이틀 업데이트
      const handleRegionReady = () => {
        updateTitle();
        window.removeEventListener('regionReady', handleRegionReady);
      };
      window.addEventListener('regionReady', handleRegionReady);

      return () => {
        window.removeEventListener('regionReady', handleRegionReady);
      };
    }
  }, [regionController.model.selectedRegion, mainCategory]);

  // 페이지 진입 시 카테고리 상태 및 쿠키 초기화
  useEffect(() => {
    setMainCategory('');
    setSubCategory('');
  }, []);

  return (
    <div className="challenge-all-wrapper">
      <MainHeader accessToken={accessToken} />
      <div className="challenge-all-content-container">
        <MainCategory categoryList={categoryList} />
        <div className="challenge-all-content">
          <div className="challenge-all-top-container">
            <div className="challenge-all-title-box">
              <Title titleName={title} />
            </div>
            <SubCategory categoryList={categoryList} />
            <div className="divider"></div>
            <div className="challenge-all-challenging-btn-box">
              <Button
                type="button"
                className={`challenge-all-challenging-btn ${isRecruiting === 'Y' ? 'isRecruiting' : ''}`}
                title="모집중만 보기"
                onClick={() => {
                  setIsRecruiting(isRecruiting === 'N' ? 'Y' : 'N');
                }}
              />
            </div>
          </div>

          <div className="challenge-all-list-wrapper">
            <ChallengeList<ChallengeItemType>
              challengeList={challengeList}
              accessToken={accessToken}
              isLoading={isLoading}
              hasSubCategoryBox={mainCategory && mainCategory !== '전체'}
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
