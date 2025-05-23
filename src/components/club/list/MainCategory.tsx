import React, { useEffect, useState } from 'react';
import { categoryData } from './Category'; // test용 데이터
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { getCookie, setCookie } from '../../../utils/Cookie';
import '../../../styles/club/list/MainCategory.scss';

const MainCategory = () => {
  const mainCategoryData = [{ mainCategory: '전체' }, ...categoryData];
  const { setMainCategory, setSubCategory } = useClubCategoryStore();
  const [activeMainCategory, setActiveMainCategory] = useState<string>('전체');

  useEffect(() => {
    let mainCategory = '전체';

    if (decodeURIComponent(getCookie('subCategory'))) {
      const selectedCategory = categoryData.find(data =>
        data.subCategories.includes(
          decodeURIComponent(getCookie('subCategory')),
        ),
      );
      if (selectedCategory) {
        mainCategory = selectedCategory.mainCategory;
      }
    }

    setMainCategory(mainCategory);
    setActiveMainCategory(mainCategory);
  }, []);

  const handleClickMainCategory = (category: string) => {
    if (category === '전체') {
      // TODO: mainList 초기 데이터 api 호출

      setSubCategory('');
      setCookie('subCategory', '', 0);
    } else {
      // TODO: mainCategory 기반 전체 데이터 api 호출 ?? 호출 시점에 대해서 기획 & 백엔드 확인 필요
    }

    setMainCategory(category);
    setActiveMainCategory(category);
  };

  return (
    <div className="main-category-container">
      {mainCategoryData.map(data => {
        return (
          <div
            className={`main-category-item-container ${activeMainCategory === data.mainCategory ? 'active' : ''}`}
            key={data.mainCategory}
          >
            <div
              className="main-category-item-box"
              onClick={() => handleClickMainCategory(data.mainCategory)}
            >
              <div className="main-category-icon"></div>
              <span>{data.mainCategory}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainCategory;
