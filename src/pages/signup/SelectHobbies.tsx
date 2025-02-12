import React from 'react';
import { useNavigate } from 'react-router';
import useHobbyStore from '../../store/signup/useHobbyStore';

import Header from '../../components/login/Header';
import '../../styles/signup/SelectHobbies.scss';
import Button from '../../components/button/Button';


const SelectHobbies = () => {
  const { selectedHobbies, addHobby, removeHobby, hobbyCount,hideHobbyList,setHideHobbyList } = useHobbyStore();
  const navigate = useNavigate();
  const CATEGORY_DATA = [
    {
      category: '스포츠',
      items: ['자전거', '배드민턴', '볼링', '테니스', '골프', '클라이밍', '탁구', '러닝', '축구', '농구', '야구'],
    },
    {
      category: '외국/언어',
      items: ['영어', '일본어', '중국어', '프랑스어', '러시아어', '독일어', '튀르키에어'],
    },
    {
      category: '사교/인맥',
      items: ['지역', '나이', '파티', '맛집'],
    },
  ];

  const toggleHobbyListVisibility = (index:number) =>{
    setHideHobbyList(index);
  }

  const selectHobbyToggle = (hobby : string) =>{
    selectedHobbies.includes(hobby) ? removeHobby(hobby) : addHobby(hobby);
  }

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
      <div className="hobby-title">
        <Header className="Header" headerTitle="어떤 취미에 관심이 있으신가요?"/>
        <span className={hobbyCount === 3  ? 'max' : ''}>
          관심 취미는 최대 3개까지 선택할 수 있어요. ({hobbyCount}/3)
        </span>
      </div>

      <main>
        {/*취미 카테고리, 리스트*/}
        <div className="hobby">
          <div className="category">
            {CATEGORY_DATA.map((categoryObj, index) => (
                <div key={index}>
                  <div className="title">
                    <span className="circle"></span>
                    <span className="text">{categoryObj.category}</span>
                    <button
                        className={isHobbyListHidden(index)? 'hide' : 'show'}
                        onClick={() => toggleHobbyListVisibility(index)}
                    ></button>
                  </div>
                  <ul className={`hobby-ul ${isHobbyListHidden(index)? 'hide' : ''}`}>
                      {categoryObj.items.map((item, idx) => (
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
          <div className="selected-box">
            <ul>
              {selectedHobbies.map((hobby, idx) => (
                <li key={idx}>
                  <span className="text"> {hobby} </span>
                  <span className="delete" onClick={() => removeHobby(hobby)}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="buttons">
          <Button
              className={isNextButtonDisabled ? 'next disable' : 'next'}
              title="다음"
              onClick={() => !isNextButtonDisabled && navigate('/next')}
          />
          <Button
            className="skip"
            title="건너뛰기"
            onClick={() => navigate('/next')}
          />
        </div>
      </main>
    </div>
  );
};


export default SelectHobbies;
