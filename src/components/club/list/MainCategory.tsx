import React from 'react';
import { categoryData } from './Category';
import '../../../styles/club/list/MainCategory.scss';

const MainCategory = () => {
  const mainCategory = [{ mainCategory: '전체' }, ...categoryData];

  return (
    <div className="main-category-container">
      {mainCategory.map((data, index) => {
        return (
          <div className="main-category-item-container" key={index}>
            <div className="main-category-item-box">
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
