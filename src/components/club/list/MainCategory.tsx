import React, { useEffect } from 'react';
import useClubCategoryStore from '../../../store/club/useClubCategoryStore';
import { getCookie, setCookie } from '../../../utils/Cookie';
import { CategorySlugMap } from '../../../services/category/models/CategoryListModel';
import { HobbyCategory } from '../../../api/ApiTypes';
import '../../../styles/club/list/MainCategory.scss';

interface MainCategoryProps {
  categoryList: HobbyCategory[];
}

const MainCategory = ({ categoryList }: MainCategoryProps) => {
  const { mainCategory, setMainCategory, setSubCategory } =
    useClubCategoryStore();

  useEffect(() => {
    const rawCookie = getCookie('mainCategory');

    // 쿠키에 저장된 인코딩된 한글값 디코딩하여 불러오기
    // 값이 없으면 '전체'가 기본값
    const decodedMainCategory = rawCookie
      ? decodeURIComponent(rawCookie)
      : '전체';

    setMainCategory(decodedMainCategory);
  }, []);

  const handleClickMainCategory = (mainCategory: string) => {
    if (mainCategory === '전체') {
      // mainCategory가 전체일 경우 쿠키 삭제
      setCookie('mainCategory', '', 0);
    } else {
      // 그 외 케이스 쿠키에 저장
      setCookie('mainCategory', mainCategory);
    }

    setMainCategory(mainCategory);

    // 메인 카테고리 클릭시 subCategory값은 '전체'로 초기화 & 쿠키 삭제
    setSubCategory('전체');
    setCookie('subCategory', '', 0);
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
