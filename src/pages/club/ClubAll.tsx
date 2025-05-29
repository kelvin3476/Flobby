import React, { useEffect, useState } from 'react';
import logger from '../../utils/Logger';
import { useLocation } from 'react-router-dom';
import MainHeader from '../../components/header/MainHeader';
import MainCategory from '../../components/club/list/MainCategory';
import Title from '../../components/club/text/Title';
import SubCategory from '../../components/club/list/SubCategory';
import ClubList from '../../components/club/list/ClubList';
import useClubCategoryStore from '../../store/club/useClubCategoryStore';
import { CategoryListController } from '../../services/club/controllers/CategoryListController';
import { ClubItemsListController } from '../../services/club/controllers/ClubListController';
import { ClubListItem, HobbyCategory } from '../../api/ApiTypes';
import '../../styles/main/club/ClubAll.scss';

const ClubAll = () => {
  const location = useLocation();
  const accessToken = location.state as string | null;

  logger.log('[cluball: accessToken]', accessToken);

  const { mainCategory, subCategory } = useClubCategoryStore();
  const [categoryList, setCategoryList] = useState<HobbyCategory[]>([]);
  const [clubList, setClubList] = useState<ClubListItem[]>([]);

  // 카테고리 목록 컨트롤러
  const categoryListController = CategoryListController.getInstance();

  useEffect(() => {
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
  }, []);

  // 모임 목록 컨트롤러
  const clubItemsListController = ClubItemsListController.getInstance();

  useEffect(() => {
    const fetchClubItemsList = async () => {
      if (!mainCategory || mainCategory === '전체') {
        const clubListData = await clubItemsListController.getClubList();
        setClubList(clubListData);
      } else {
        const clubListData = await clubItemsListController.getClubList(
          encodeURIComponent(mainCategory),
        );
        setClubList(clubListData);
      }
    };

    fetchClubItemsList();
  }, [mainCategory, subCategory]);

  return (
    <div className="club-all-wrapper">
      <MainHeader accessToken={accessToken} />
      <div className='club-all-content-container'>
        <MainCategory categoryList={categoryList} />  
        <div className='club-all-content'>
          <Title titleName={mainCategory ? mainCategory : '모임'} />
          <div className='club-all-sub-content'>  
            <SubCategory categoryList={categoryList} />
            <ClubList clubList={clubList} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubAll;
