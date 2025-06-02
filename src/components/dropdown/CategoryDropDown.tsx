import React, { useEffect, useState } from 'react';
import DropDown from './Dropdown';
import useClubRegisterStore from '../../store/club/useClubRegisterStore';
import { HobbyCategory } from '../../api/ApiTypes';
import { CategoryListController } from '../../services/category/controllers/CategoryListController';
import '../../styles/dropdown/CommonDropDown.scss';

const CategoryDropDown = ({ className }) => {
  const [categoryList, setCategoryList] = useState<HobbyCategory[]>([]);

  const {
    mainCategory,
    setMainCategory,
    subCategory,
    setSubCategory,
    isCategoryValid,
    setIsCategoryValid,
    categoryError,
    setCategoryError,
  } = useClubRegisterStore();

  const categoryListController = CategoryListController.getInstance();

  useEffect(() => {
    const fetchCategoryListData = async () => {
      const categoryListData = await categoryListController.getCategoryList();
      setCategoryList(categoryListData);
    };
    fetchCategoryListData();
  }, []);

  const mainCategories = categoryList.map(item => item.mainCategory);

  const subCategories =
    categoryList.find(item => item.mainCategory === mainCategory)
      ?.subCategories ?? [];

  return (
    <div className={`dropdown-group-container ${className}`}>
      <div className="dropdown-label-box">
        <span className="dropdown-label">카테고리</span>
        <span className="dropdown-required">*</span>
      </div>
      <div className="dropdown-box">
        <DropDown
          options={mainCategories}
          placeholder="상위 카테고리"
          disabled={false}
          onSelect={(value: string) => {
            setMainCategory(value);
            setSubCategory(null);
            setIsCategoryValid(true);
            setCategoryError('');
          }}
        />

        <DropDown
          options={subCategories}
          placeholder="하위 카테고리"
          disabled={mainCategory === ''}
          defaultItem={subCategories.includes(subCategory) ? subCategory : null}
          onSelect={(value: string) => {
            setSubCategory(value);
            setIsCategoryValid(true);
            setCategoryError('');
          }}
        />
      </div>
      {!isCategoryValid && <div className="err-message">{categoryError}</div>}
    </div>
  );
};

export default CategoryDropDown;
