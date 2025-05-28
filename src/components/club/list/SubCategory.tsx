import React from 'react';
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { setCookie } from '../../../utils/Cookie';
import { HobbyCategory } from '../../../api/ApiTypes';
import '../../../styles/club/list/SubCategory.scss';

interface SubCategoryProps {
  categoryList: HobbyCategory[];
}

const SubCategory = ({ categoryList }: SubCategoryProps) => {
  const { mainCategory, subCategory, setSubCategory } = useClubCategoryStore();

  // 선택된 메인 카테고리에 해당하는 카테고리 리스트
  const selectedCategoryData = categoryList.find(
    data => data.mainCategory === mainCategory,
  );

  // 해당하는 서브 카테고리 목록만 추출후 '전체'값 추가
  const subCategoryList = selectedCategoryData?.subCategories
    ? ['전체', ...selectedCategoryData.subCategories]
    : []; // 값이 없으면 빈배열

  const handleClickSubCategory = (subCategory: string) => {
    if (subCategory === '전체') {
      setCookie('subCategory', '', 0);
    } else {
      setCookie('subCategory', subCategory);
    }

    setSubCategory(subCategory);
  };

  return (
    mainCategory !== '전체' &&
    subCategoryList.length > 0 && (
      <div className="sub-category-container">
        <div className="sub-category-box">
          {subCategoryList.map((subCategoryItem, index) => {
            return (
              <span
                key={subCategoryItem}
                onClick={() => handleClickSubCategory(subCategoryItem)}
                className={subCategory === subCategoryItem ? 'active' : ''}
              >
                {subCategoryItem}
              </span>
            );
          })}
        </div>
      </div>
    )
  );
};

export default SubCategory;
