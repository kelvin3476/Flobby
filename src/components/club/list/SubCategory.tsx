import React, { useEffect, useState } from 'react';
import { categoryData } from './Category'; // test용 데이터
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { getCookie, setCookie } from '../../../utils/Cookie';
import '../../../styles/club/list/SubCategory.scss';

const SubCategory = () => {
  const { mainCategory, setSubCategory } = useClubCategoryStore();
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  // TODO: api 연동시 실제 데이터로 처리
  const selectedCategoryData = categoryData.find(
    data => data.mainCategory === mainCategory,
  );

  const subCategoryList = [
    '전체',
    ...(selectedCategoryData?.subCategories || []),
  ];

  useEffect(() => {
    if (getCookie('subCategory')) {
      setSubCategory(decodeURIComponent(getCookie('subCategory')));
      setActiveCategory(decodeURIComponent(getCookie('subCategory')));
    }
  }, []);

  const handleClickSubCategory = (subCategory: string) => {
    // TODO: subCategory 기반 데이터 api 호출

    setSubCategory(subCategory);
    setActiveCategory(subCategory);
    setCookie('subCategory', subCategory);
  };

  return (
    mainCategory !== '전체' &&
    subCategoryList.length > 0 && (
      <div className="sub-category-container">
        <div className="sub-category-box">
          {subCategoryList.map(subCategory => {
            return (
              <span
                key={subCategory}
                onClick={() => handleClickSubCategory(subCategory)}
                className={activeCategory === subCategory ? 'active' : ''}
              >
                {subCategory}
              </span>
            );
          })}
        </div>
      </div>
    )
  );
};

export default SubCategory;
