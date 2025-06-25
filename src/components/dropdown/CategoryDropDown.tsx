import React, { useEffect, useState } from 'react';
import DropDown from './Dropdown';
import useClubRegisterStore from '../../store/club/useClubRegisterStore';
import { HobbyCategory } from '../../api/ApiTypes';
import { CategoryListController } from '../../services/category/controllers/CategoryListController';
import Label from '../club/register/Label';
import '../../styles/dropdown/CommonDropDown.scss';

interface CategoryDropDownProps {
  className?: string;
  isEditPage?: boolean;
}

const CategoryDropDown = ({ className, isEditPage }: CategoryDropDownProps) => {
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

  // 카테고리 리스트 api 호출
  const categoryListController = CategoryListController.getInstance();

  useEffect(() => {
    const fetchCategoryListData = async () => {
      const categoryListData = await categoryListController.getCategoryList();
      setCategoryList(categoryListData);
    };
    fetchCategoryListData();
  }, []);

  // 메인 카테고리만 필터링 => 메인 카테고리 목록
  const mainCategories = categoryList.map(item => item.mainCategory);

  // 서브 카테고리만 필터링 => 서브 카테고리 목록
  const subCategories =
    categoryList.find(item => item.mainCategory === mainCategory)
      ?.subCategories ?? [];

  // 수정 페이지 로직
  // 서브카테고리를 기준으로 메인 카테고리 설정
  useEffect(() => {
    for (const { mainCategory, subCategories } of categoryList) {
      if (subCategories.includes(subCategory)) {
        setMainCategory(mainCategory);
        setSubCategory(subCategory);
      }
    }
  }, [subCategory]);

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
