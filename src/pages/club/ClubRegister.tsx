import React from "react";

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
            <Button className="cancel-btn" title="취소" onClick={() => console.log("취소염")} />
            <Button className="allow-btn" title="등록" onClick={() => console.log("오키염")} />
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