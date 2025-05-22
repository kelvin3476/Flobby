import React, { useEffect, useState } from 'react';
import { categoryData } from './Category'; // test용 데이터
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { getCookie, setCookie } from '../../../utils/Cookie';
import '../../../styles/club/list/SubCategory.scss';

const SubCategory = () => {
  const { mainCategory, setSubCategory } = useClubCategoryStore();
  const [activeCategory, setActiveCategory] = useState<string>('');

  const selectedCategoryData = categoryData.find(
    data => data.mainCategory === mainCategory,
  );

  const subCategoryList = selectedCategoryData?.subCategories || [];

  useEffect(() => {
    if (mainCategory && getCookie('subCategory')) {
      setSubCategory(decodeURIComponent(getCookie('subCategory')));
      setActiveCategory(decodeURIComponent(getCookie('subCategory')));
    }
  }, [mainCategory]);

  const handleClickSubCategory = (subCategory: string) => {
    // TODO: subCategory 기반 데이터 api 호출

    setSubCategory(subCategory);
    setActiveCategory(subCategory);
    setCookie('subCategory', subCategory);
  };

  return (
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
