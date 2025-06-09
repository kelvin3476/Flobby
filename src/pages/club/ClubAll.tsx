import React, { useEffect, useState } from 'react';
import logger from '../../utils/Logger';
import { useNavigate } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';
import MainCategory from '../../components/club/list/MainCategory';
import Title from '../../components/club/text/Title';
import SubCategory from '../../components/club/list/SubCategory';
import ClubList from '../../components/club/list/ClubList';
import FloatingButton from '../../components/button/FloatingButton';
import useMainPage from '../../hooks/main/useMainPage';
import useClubCategoryStore from '../../store/club/useClubCategoryStore';
import { CategoryListController } from '../../services/category/controllers/CategoryListController';
import { ClubController } from '../../services/club/controllers/ClubController';
import { ClubListItem, HobbyCategory } from '../../api/ApiTypes';
import FabDefaultIcon from '../../assets/svg/club/clublist/floating_button_default.svg';
import FabDefaultCancelIcon from '../../assets/svg/club/clublist/floating_button_default_cancel.svg';
import FabClubRegisterIcon from '../../assets/svg/club/clublist/floating_button_club_register.svg';
import FabOnedayRegisterIcon from '../../assets/svg/club/clublist/floating_button_oneday_register.svg';
import '../../styles/main/club/ClubAll.scss';

const ClubAll = () => {
  const navigate = useNavigate();
  const { accessToken, mainDataList, setMainDataList } = useMainPage();

  logger.log('[cluball: accessToken]', accessToken);

  const { mainCategory, subCategory } = useClubCategoryStore();
  const [categoryList, setCategoryList] = useState<HobbyCategory[]>([]);
  const [clubList, setClubList] = useState<ClubListItem[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<string>('');

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
  const clubController = ClubController.getInstance();

  const fetchClubItemsList = async () => {
    if (!mainCategory || mainCategory === '전체') {
      const clubListData = await clubController.getClubList();
      setClubList(clubListData);
    } else {
      const clubListData = await clubController.getClubList(
        encodeURIComponent(mainCategory),
      );
      setClubList(clubListData);
    }
  };

  // 카테고리 값 변경 시 모임 목록 업데이트
  useEffect(() => {
    fetchClubItemsList();
  }, [mainCategory, subCategory]);

  // 지역 변경 시 모임 목록 업데이트
  useEffect(() => {
    const handleRegionChange = () => {
      fetchClubItemsList();
    };

    window.addEventListener('regionChanged', handleRegionChange);
    return () => {
      window.removeEventListener('regionChanged', handleRegionChange);
    };
  }, []);

  return (
    <div className="club-all-wrapper">
      <MainHeader
        accessToken={accessToken}
        mainDataList={mainDataList}
        setMainDataList={setMainDataList}
      />
      <div className="club-all-content-container">
        <MainCategory categoryList={categoryList} />
        <div className="club-all-content">
          <Title titleName={mainCategory ? mainCategory : '모임'} />
          <div className="club-all-sub-content">
            <SubCategory categoryList={categoryList} />
            <ClubList clubList={clubList} />
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

export default ClubAll;
