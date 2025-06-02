import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHobbyStore from '../../store/signup/useHobbyStore';

import Header from '../../components/login/Header';
import '../../styles/signup/SelectHobbies.scss';
import Button from '../../components/button/Button';
import ProgressBar from '../../components/signup/ProgressBar';

import { CategoryListController } from '../../services/category/controllers/CategoryListController';

const SelectHobbies = () => {
  const { 
    selectedHobbies, 
    addHobby, 
    removeHobby, 
    hobbyCount,
    hideHobbyList,
    setHideHobbyList, 
    warning, 
    setWarning } = useHobbyStore();

  const navigate = useNavigate();

  const [ hobbyCategoryList, setHobbyCategoryList ] = useState([]);
  
  const categoryListController = CategoryListController.getInstance();
  
  useEffect(() => {
    const fetchHobbies = async() => {
      await categoryListController.getCategoryList();
      setHobbyCategoryList(categoryListController.model.categoryList);
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
            {hobbyCategoryList.map((categoryObj, index) => (
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
                      {categoryObj.subCategories?.map((item, idx) => (
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
      <footer>
        <div className="hobby-line1"></div>
        <div className="hobby-line2"></div>
      </footer>
    </div>
  );
};


export default SelectHobbies;
