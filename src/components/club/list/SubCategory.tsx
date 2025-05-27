import React, { useEffect, useState } from 'react';
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { getCookie, setCookie } from '../../../utils/Cookie';
import { HobbyCategory } from '../../../api/ApiTypes';
import '../../../styles/club/list/SubCategory.scss';

interface SubCategoryProps {
  categoryList: HobbyCategory[];
}

const SubCategory = ({ categoryList }: SubCategoryProps) => {
  const { mainCategory, setSubCategory } = useClubCategoryStore();
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  const selectedCategoryData = categoryList.find(
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
    if (subCategory === '전체') {
      setCookie('subCategory', '', 0);
    } else {
      setCookie('subCategory', subCategory);
    }

    setSubCategory(subCategory);
    setActiveCategory(subCategory);
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
