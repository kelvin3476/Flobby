import React from 'react';

import Header from '@/components/login/Header';
import Button from '@/components/button/Button';

import useHobbyStore from '@/store/signup/useHobbyStore';

import { CategorySlugMap } from '@/services/category/models/CategoryListModel';
import { CategoryListController } from '@/services/category/controllers/CategoryListController';

import "@/styles/modal/CategoryModal.scss"

interface CategoryModalProps {
  onClose: () => void;
}

const CategoryModal = ({ onClose }: CategoryModalProps) => {
  const [ hobbyCategoryList, setHobbyCategoryList ] = React.useState([]);

  const {
    selectedHobbies,
    addHobby,
    removeHobby,
    hobbyCount,
    hideHobbyList,
    setHideHobbyList,
  } = useHobbyStore();

  const categoryListController = CategoryListController.getInstance();

  React.useEffect(() => {
    const fetchHobbies = async() => {
      await categoryListController.getCategoryList();
      setHobbyCategoryList(categoryListController.model.categoryList);
    };

    fetchHobbies();
  }, []);

  const toggleHobbyListVisibility = (index:number) =>{
    setHideHobbyList(index);
  }

  const selectHobbyToggle = (hobby : string) => {
    if (selectedHobbies.includes(hobby)) {
      removeHobby(hobby);
    } else {
      if (hobbyCount < 3) {
        addHobby(hobby);
      }
    }
  };

  const isHobbyListHidden = (index: number) => hideHobbyList.includes(index);

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
    <>
      {/* 카테고리 모달 오버레이 */}
      <div className="category-modal-overlay" onClick={onClose}></div>

      {/* 카테고리 모달 컨테이너 */}
      <div className="category-modal-container">
        <div className="hobby-title">
          <Header className="Header" headerTitle="관심 카테고리를 선택해 주세요" />
          <span>관심 카테고리는 3개까지 선택할 수 있어요.</span>
        </div>

        {/* 취미 카테고리 리스트 */}
        <main>
          <div className="hobby">
            <div className="category">
              {hobbyCategoryList.map((categoryObj, index) => (
                <div key={index}>
                  <div className="title">
                    <span className={`circle ${CategorySlugMap[categoryObj.mainCategory] || ""}`}></span>
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
              className="cancel-btn"
              title="취소"
              onClick={onClose}
            />
            <Button
              className="save-btn"
              title="저장"
              onClick={() => {
                console.log('저장 버튼 클릭 !!');
                onClose()
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default CategoryModal;