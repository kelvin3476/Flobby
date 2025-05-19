import React, { useState } from "react";
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
import ClubModal from "../../components/modal/ClubModal";

import "../../styles/club/register/ClubRegister.scss";

const ClubRegister = () => {
  const {
    clubName,
    description,
    autoApprovalFlag,
    location,
    maxMembers,
    file,
    setIsImageFileValid,
    setImageFileError,
    mainCategory,
    subCategory,
    setIsCategoryValid,
    setCategoryError,
    setIsTitleValid,
    setIsDescValid,
    setIsMaxValid,
    setTitleError,
    setDescError,
    setMaxError,
  } = useClubRegisterStore();

  const [modalStep, setModalStep] = useState<null | 1 | 2>(null);

  const nav = useNavigate();

  const handleValidChange = () => {
    let isError = false;

    // 이미지 유효성 검사
    if (!file) {
      setIsImageFileValid(false);
      setImageFileError("이미지를 등록해 주세요.");
      isError = true;
    } else {
      setIsImageFileValid(true);
      setImageFileError("");
    }

    // 카테고리 유효성 검사
    if (!mainCategory || !subCategory) {
      setIsCategoryValid(false);
      setCategoryError("카테고리를 선택해 주세요.");
      isError = true;
    } else {
      setIsCategoryValid(true);
      setCategoryError("");
    }

    // 모임제목 유효성 검사
    if (clubName.trim() === "") {
      setIsTitleValid(false);
      setTitleError("모임 제목을 입력해 주세요.");
      isError = true;
    } else {
      setIsTitleValid(true);
      setTitleError("");
    }

    // 모임내용 유효성 검사
    if (description.trim() === "") {
      setIsDescValid(false);
      setDescError("소개글을 입력해 주세요.");
      isError = true;
    } else {
      setIsDescValid(true);
      setDescError("");
    }

    // 모임규모 유효성 검사
    if (!maxMembers) {
      setIsMaxValid(false);
      setMaxError("인원 수를 입력해 주세요.");
      isError = true;
    } else {
      setIsMaxValid(true);
      setMaxError("");
    }

    if(isError) return;

    setModalStep(1);
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
            <Button className="cancel-btn" title="취소" onClick={() => nav('/')} />
            <Button className="allow-btn" title="등록" onClick={handleValidChange} />
          </div>
        </div>
      </main>
      <footer>
        {/* 추후 footer 추가 */}
      </footer>

      {modalStep && (
        <ClubModal 
          message={modalStep === 1 ? "등록 하시겠습니까?" : "정상적으로 처리되었습니다."}
          showIcon={modalStep === 1}
          showCancelButton={modalStep === 1}
          onConfirm={() => {
            if (modalStep === 1) {
              setModalStep(2);
            } else {
              setModalStep(null);
              nav('/')
            }
          }}
          onCancel={() => setModalStep(null)}
        />
      )}
    </div>
  );
};

export default ClubRegister;