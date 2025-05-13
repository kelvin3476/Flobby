import React, { useEffect, useState } from 'react';
import DropDown from './Dropdown';
import SignUp from '../../api/signup/SignUp';
import logger from '../../utils/Logger';
import '../../styles/dropdown/CommonDropDown.scss';
import useClubCreateStore from '../../store/club/useClubCreateStore';
import { HobbyCategory } from '../../api/ApiTypes';

const CategoryDropDown = () => {
  const [categoryList, setCategoryList] = useState<HobbyCategory[]>([]);

  const { mainCategory, setMainCategory, setSubCategory } =
    useClubCreateStore();

  useEffect(() => {
    const fetchHobbyList = async () => {
      try {
        const response = await SignUp.getHobbyList();
        const { code, message, data } = response.data;

        if (code === 1000) {
          // API 호출 성공
          logger.log('getHobbyListData', data);
          setCategoryList(data);
        } else if (code === 1001) {
          // API 호출 실패
          throw new Error(
            message || '카테고리 리스트 데이터를 가져오지 못했습니다.',
          );
        } else if (code === 1002) {
          // API 예외 발생
          throw new Error(message || '서버 오류가 발생했습니다.');
        }
      } catch (err: any) {
        console.log(err.message || '데이터 로드 실패');
      }
    };
    fetchHobbyList();
  }, []);

  const mainCategories = categoryList.map(item => item.mainCategory);

  const subCategories =
    categoryList.find(item => item.mainCategory === mainCategory)
      ?.subCategories ?? [];

  return (
    <div className="dropdown-group-container">
      <div className="dropdown-label-box">
        <span className="dropdown-label">카테고리 선택</span>
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
          }}
        />
        <DropDown
          options={subCategories}
          placeholder="하위 카테고리"
          disabled={mainCategory === ''}
          onSelect={(value: string) => {
            setSubCategory(value);
          }}
        />
      </div>
    </div>
  );
};

export default CategoryDropDown;
