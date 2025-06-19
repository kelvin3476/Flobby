import React, { useEffect, useState } from 'react';
import DropDown from './Dropdown';
import useClubRegisterStore from '../../store/club/useClubRegisterStore';
import { HobbyCategory } from '../../api/ApiTypes';
import { CategoryListController } from '../../services/category/controllers/CategoryListController';
import Label from '../club/register/Label';
import '../../styles/dropdown/CommonDropDown.scss';
import logger from '../../utils/Logger';

interface CategoryDropDownProps {
  className?: string;
  prevSubCategory?: string | null;
  isEditPage?: boolean;
}

const CategoryDropDown = ({ className, prevSubCategory, isEditPage }) => {
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

  useEffect(() => {
    categoryListController
      .getCategoryList()
      .then(response => {
        if (prevSubCategory) {
          for (const { mainCategory, subCategories } of response) {
            if (subCategories.includes(prevSubCategory)) {
              setMainCategory(mainCategory);
              setSubCategory(prevSubCategory);
            }
          }
        }
      })
      .catch(err => {
        logger.error(err);
      });
  }, [prevSubCategory]);

  return (
    <div className={`dropdown-group-container ${className}`}>
      <Label labelTitle="카테고리" isRequired />
      <div className="dropdown-box">
        <DropDown
          options={mainCategories}
          placeholder="상위 카테고리"
          disabled={false}
          defaultItem={isEditPage ? mainCategory : null}
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
          defaultItem={isEditPage ? subCategory : null}
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
