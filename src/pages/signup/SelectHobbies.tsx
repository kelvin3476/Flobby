import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import Header from '../../components/login/Header';
import '../../styles/signup/SelectHobbies.scss';
import Button from '../../components/button/Button';

const SelectHobbies = () => {
  const navigate = useNavigate();
  const sports = [
    '자전거',
    '배드민턴',
    '볼링',
    '테니스',
    '골프',
    '클라이밍',
    '탁구',
    '러닝',
    '축구',
    '농구',
    '야구',
  ];
  const languages = [
    '영어',
    '일본어',
    '중국어',
    '프랑스어',
    '러시아어',
    '독일어',
    '튀르키에어',
  ];
  const network = ['지역', '나이', '파티', '맛집'];

  const categoryData = [
    { category: '스포츠', items: sports },
    { category: '외국/언어', items: languages },
    { category: '사교/인맥', items: network },
    { category: '사교/인맥', items: network },
  ];

  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [hobbyCount, setHobbyCount] = useState(0);

  const handleOnChange = el => {
    if (selectedHobbies.length >= 3 || selectedHobbies.includes(el)) {
      return;
    } else {
      setSelectedHobbies(prev => [...prev, el]);
    }
    setHobbyCount(prev => prev + 1);
  };

  const deleteHobby = el => {
    const updateHobbies = selectedHobbies.filter(item => item !== el);
    setSelectedHobbies(updateHobbies);
    setHobbyCount(prev => prev - 1);
  };

  return (
    <div className="hobby-container">
      <div className="hobby-title">
        <Header
          className="Header"
          headerTitle="어떤 취미에 관심이 있으신가요?"
        />
        <span className={hobbyCount == 3 ? 'max' : ''}>
          관심 취미는 최대 3개까지 선택할 수 있어요. ({hobbyCount}/3)
        </span>
      </div>

      <main>
        {/*취미 카테고리, 리스트*/}
        <div className="hobby">
          <div className="category">
            {categoryData.map((categoryObj, index) => (
              <div key={index}>
                <div className="title">
                  <span className="circle"></span>
                  <span className="text">{categoryObj.category}</span>
                  <button
                    className="hide"
                    onClick={() => console.log(index)} //todo
                  ></button>
                </div>
                <ul className="hobby-ul">
                  {categoryObj.items.map((el, idx) => (
                    <li key={idx}>
                      <label
                        htmlFor={el}
                        className={
                          selectedHobbies.includes(el) ? 'checked' : ''
                        }
                      >
                        {el}
                      </label>
                      <input
                        id={el}
                        type="checkbox"
                        checked={selectedHobbies.includes(el)}
                        onChange={() => handleOnChange(el)}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/*선택된 취미*/}
          <div className="selected-box">
            <ul>
              {selectedHobbies.map((el, idx) => (
                <li key={idx}>
                  <span className="text"> {el} </span>
                  <span
                    className="delete"
                    onClick={() => deleteHobby(el)}
                  ></span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="buttons">
          <Button
            className="next"
            title="다음"
            onClick={() => navigate('/next')}
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
