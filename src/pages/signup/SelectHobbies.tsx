import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHobbyStore from '../../store/signup/useHobbyStore';

import Header from '../../components/login/Header';
import '../../styles/signup/SelectHobbies.scss';
import Button from '../../components/button/Button';
import ProgressBar from '../../components/signup/ProgressBar';

import SignUp from '../../api/signup/SignUp';
import type { HobbyCategory } from '../../store/signup/useHobbyStore';

const SelectHobbies = () => {
  const { selectedHobbies, addHobby, removeHobby, hobbyCount,hideHobbyList,setHideHobbyList, warning, setWarning, hobbyCategoryMap, setHobbyCategoryMap } = useHobbyStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchHobbies = async() => {

      try {
        const response = await SignUp.getHobbyList();
        const { code, message, data } = response.data;

        if (code === 1000) {
          // API 호출 성공
          const formattedData: HobbyCategory[] = [];

          data.forEach((item: any) => {
            const subItems: string[] = [];

            if (Array.isArray(item.subCategories)) {
              item.subCategories.forEach((subItem: any) => {
                if (typeof subItem === 'string') {
                  subItems.push(subItem);
                } else if (typeof subItem === 'object' && subItem.subCategories) {
                  subItems.push(...subItem.subCategories);
                }
              });
            }

            formattedData.push({
              mainCategory: item.mainCategory,
              subCategory: subItems,
            });
          });

          setHobbyCategoryMap(formattedData);
        } else if (code === 1001) {
          // API 호출 실패
          throw new Error(message || '데이터를 가져오지 못했습니다.');
        } else if (code === 1002) {
          // API 예외 발생
          throw new Error(message || "서버 오류가 발생했습니다.");
        }
      } catch (err: any) {
        console.error(err.message || "데이터 로드 실패");
      }
    };

    fetchHobbies();
  }, []);

  const toggleHobbyListVisibility = (index:number) =>{
    setHideHobbyList(index);
  }

  const selectHobbyToggle = (hobby : string) =>{
    if (selectedHobbies.includes(hobby)) {
      removeHobby(hobby);
      setWarning(false);
    } else {
      if (hobbyCount >= 3) {
        setWarning(true);
      }else {
        addHobby(hobby);
        setWarning(false);
      }
    }
  };

  const isHobbyListHidden = (index: number) => hideHobbyList.includes(index);

  const isNextButtonDisabled = hobbyCount === 0;

  //선택된 취미를 렌더링
  const renderSelectedHobbies = ()=> {
    return (<div className="selected-box">
          <ul>
            {selectedHobbies.map((el, idx) => (
                <li key={idx}>
                  <span className="text"> {el} </span>
                  <span className="delete" onClick={() => removeHobby(el)}></span>
                </li>
            ))}
          </ul>
        </div>
    )};

  return (
    <div className="hobby-container">
      <ProgressBar />
      <div className="hobby-title">
        <Header className="Header" headerTitle="어떤 취미에 관심이 있으신가요?"/>
        <span className={warning ? 'max' : ''}>
          관심 취미는 최대 3개까지 선택할 수 있어요. ({hobbyCount}/3)
        </span>
      </div>

      <main>
        {/*취미 카테고리, 리스트*/}
        <div className="hobby">
          <div className="category">
            {hobbyCategoryMap.map((categoryObj, index) => (
                <div key={index}>
                  <div className="title">
                    <span className="circle"></span>
                    <span className="text">{categoryObj.mainCategory}</span>
                    <button
                        className={isHobbyListHidden(index)? 'hide' : 'show'}
                        onClick={() => toggleHobbyListVisibility(index)}
                    ></button>
                  </div>
                  <ul className={`hobby-ul ${isHobbyListHidden(index)? 'hide' : ''}`}>
                      {categoryObj.subCategory?.map((item, idx) => (
                          <li key={idx}>
                            <label
                                htmlFor={item}
                                className={selectedHobbies.includes(item) ? 'checked' : ''}>
                              {item}
                            </label>
                            <input
                                id={item}
                                type="checkbox"
                                checked={selectedHobbies.includes(item)}
                                onChange={() => selectHobbyToggle(item)}
                            />
                          </li>
                      ))}
                    </ul>
                </div>
              ))}
          </div>

          {/*선택된 취미*/}
          {renderSelectedHobbies()}

        </div>
        <div className="buttons">
          <Button
              className={isNextButtonDisabled ? 'next disable' : 'next'}
              title="다음"
              onClick={() => !isNextButtonDisabled && navigate('/signup/success')}
          />
          <Button
            className="skip"
            title="건너뛰기"
            onClick={() => navigate('/signup/success')}
          />
        </div>
      </main>
    </div>
  );
};


export default SelectHobbies;
