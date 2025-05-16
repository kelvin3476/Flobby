import React from "react";
import { useNavigate } from "react-router-dom";
import useClubRegisterStore from "../../store/club/useClubRegisterStore";

import MainHeader from "../../components/header/MainHeader";
import ImageUploader from "../../components/club/register/ImageUploader";
import RegionDropDown from "../../components/dropdown/RegionDropDown";
import CategoryDropDown from "../../components/dropdown/CategoryDropDown";
import MaxMember from "../../components/club/register/MaxMember";
import ClubDescription from "../../components/club/register/ClubDescription";
import ClubAuto from "../../components/club/register/ClubAuto";

import Button from "../../components/button/Button";
import Title from "../../components/club/text/Title";
import RequiredText from "../../components/club/text/RequiredText";

import "../../styles/club/register/ClubRegister.scss";

const ClubRegister = () => {
  const {
    file,
    setIsImageFileValid,
    setImageFileError,
    mainCategory,
    subCategory,
    setIsCategoryValid,
    setCategoryError,
  } = useClubRegisterStore();

  const nav = useNavigate();

  const handleValidChange = () => {
    let isError = false;

    if (!file) {
      setIsImageFileValid(false);
      setImageFileError("이미지를 등록해 주세요.");
      isError = true;
    } else {
      setIsImageFileValid(true);
      setImageFileError("");
    }

    if (!mainCategory || !subCategory) {
      setIsCategoryValid(false);
      setCategoryError("카테고리를 선택해 주세요.");
      isError = true;
    } else {
      setIsCategoryValid(true);
      setCategoryError("");
    }

    if(isError) return;
  };
  
  return (
    <div className="register-container">
      <MainHeader />
      <main>
        <div className="register-title">
          <Title titleName="모임 등록"/>
          <RequiredText />
        </div>
        <div className="register-content">
          <div className="register-up">
            <ImageUploader />
            <div className="up-and-right">
              <RegionDropDown />
              <CategoryDropDown />
              <MaxMember />
            </div>
          </div>
          <ClubDescription />
          <ClubAuto />
          <div className="buttons">
            <Button className="cancel-btn" title="취소" onClick={() => nav('/club/main')} />
            <Button className="allow-btn" title="등록" onClick={handleValidChange} />
          </div>
        </div>
      </main>
      <footer>
        {/* 추후 footer 추가 */}
      </footer>
    </div>
  );
};

export default ClubRegister;