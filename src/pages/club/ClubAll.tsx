import React, { useEffect, useState } from 'react';
import useClubCategoryStore from '../../store/club/useClubCategoryStore';
import MainCategory from '../../components/club/list/MainCategory';
import Title from '../../components/club/text/Title';
import SubCategory from '../../components/club/list/SubCategory';
import { CategoryListController } from '../../services/club/controllers/CategoryListController';
import { HobbyCategory } from '../../api/ApiTypes';

const ClubAll = () => {
  const { mainCategory } = useClubCategoryStore();
  const [categoryList, setCategoryList] = useState<HobbyCategory[]>([]);

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

  return (
    <>
      <MainCategory categoryList={categoryList} />
      <Title titleName={mainCategory ? mainCategory : '모임'} />
      <SubCategory categoryList={categoryList} />
    </>
  );
};

export default ClubAll;
