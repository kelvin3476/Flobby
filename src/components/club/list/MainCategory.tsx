import React, { useEffect, useState } from 'react';
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { getCookie, setCookie } from '../../../utils/Cookie';
import { CategoryListController } from '../../../services/club/controllers/CategoryListController';
import { CategorySlugMap } from '../../../services/club/models/CategoryListModel';
import '../../../styles/club/list/MainCategory.scss';

const MainCategory = () => {
  const { setMainCategory, setSubCategory } = useClubCategoryStore();
  const [activeMainCategory, setActiveMainCategory] = useState<string>('전체');
  const [categoryList, setCategoryList] = useState([]);

  const categoryListController = CategoryListController.getInstance();

  useEffect(() => {
    const fetchCategoryListData = async () => {
      const categoryListData = await categoryListController.getCategoryList();
      const processedCategoryListData = [
        { mainCategory: '전체' },
        ...categoryListData,
      ];
      setCategoryList(processedCategoryListData);
    };
    fetchCategoryListData();
  }, []);

  useEffect(() => {
    const rawCookie = getCookie('mainCategory');
    const decodedMainCategory = rawCookie
      ? decodeURIComponent(rawCookie)
      : '전체';

    setMainCategory(decodedMainCategory);
    setActiveMainCategory(decodedMainCategory);
  }, []);

  const handleClickMainCategory = (mainCategory: string) => {
    if (mainCategory === '전체') {
      // TODO: mainList 초기 데이터 api 호출
      setSubCategory('');
      setCookie('mainCategory', '', 0);
      setCookie('subCategory', '', 0);
    } else {
      // TODO: mainCategory 기반 전체 데이터 api 호출
      setCookie('mainCategory', mainCategory);
    }

    setMainCategory(mainCategory);
    setActiveMainCategory(mainCategory);
  };

  return (
    <div className="main-category-container">
      {categoryList.map(data => {
        return (
          <div
            className={`main-category-item-container ${activeMainCategory === data.mainCategory ? 'active' : ''}`}
            key={data.mainCategory}
          >
            <div
              className="main-category-item-box"
              onClick={() => handleClickMainCategory(data.mainCategory)}
            >
              <div
                className={`main-category-icon ${CategorySlugMap[data.mainCategory] || ''}`}
              ></div>
              <span>{data.mainCategory}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainCategory;
