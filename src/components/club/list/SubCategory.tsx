import React, { useEffect, useRef, useState } from 'react';
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { setCookie } from '../../../utils/Cookie';
import { HobbyCategory } from '../../../api/ApiTypes';
import '../../../styles/club/list/SubCategory.scss';

interface SubCategoryProps {
  categoryList: HobbyCategory[];
}

const SubCategory = ({ categoryList }: SubCategoryProps) => {
  const { mainCategory, subCategory, setSubCategory } = useClubCategoryStore();
  const boxRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);

  useEffect(() => {
    if (!boxRef.current) return;

    const boxHeight = boxRef.current.offsetHeight;
    const firstSpan = boxRef.current.querySelector('span');

    if (firstSpan) {
      const lineHeight = parseFloat(getComputedStyle(firstSpan).lineHeight);
      setIsMultiLine(boxHeight > lineHeight * 1.5);
    }
  }, [categoryList, mainCategory]);

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
      <div
        className={`sub-category-container ${isMultiLine ? 'multi-line' : ''}`}
      >
        <div className="sub-category-box" ref={boxRef}>
          {subCategoryList.map((subCategoryItem, index) => (
            <span
              key={index}
              onClick={() => handleClickSubCategory(subCategoryItem)}
              className={subCategory === subCategoryItem ? 'active' : ''}
              ref={spanRef}
            >
              {subCategoryItem}
            </span>
          ))}
        </div>
      </div>
    )
  );
};

export default SubCategory;
