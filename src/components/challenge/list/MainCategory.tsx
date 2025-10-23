import React, { useEffect } from 'react';
import useClubCategoryStore from '@/store/club/useClubCategoryStore';
import { getCookie, setCookie } from '@/utils/Cookie';
import { CategorySlugMap } from '@/services/category/models/CategoryListModel';
import { HobbyCategory } from '@/api/ApiTypes';

import '@/styles/challenge/list/MainCategory.scss';

interface MainCategoryProps {
  categoryList: HobbyCategory[];
}

const MainCategory = ({ categoryList }: MainCategoryProps) => {
  const { mainCategory, setMainCategory, setSubCategory } =
    useClubCategoryStore();

  const handleClickMainCategory = (mainCategory: string) => {
    setMainCategory(mainCategory);
    setSubCategory('전체');
  };

  return (
    <div className="main-category-container">
      {categoryList &&
        categoryList.map(data => {
          return (
            <div
              className={`main-category-item-container ${mainCategory === data.mainCategory ? 'active' : ''}`}
              key={data.mainCategory}
              onClick={() => handleClickMainCategory(data.mainCategory)}
            >
              <div className="main-category-item-box">
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
