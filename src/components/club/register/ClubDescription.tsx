import React from "react";
import Label from "./Label";
import useClubRegisterStore from "../../../store/club/useClubRegisterStore";

import "../../../styles/club/register/ClubDescription.scss";

const ClubDescription = ({ className }) => {
  
  const {
    clubName,
    setClubName,
    description,
    setDescription,
    isTitleValid,
    setIsTitleValid,
    isDescValid,
    setIsDescValid,
    descCount,
    setDescCount,
    titleError,
    setTitleError,
    descError,
    setDescError,
  } = useClubRegisterStore();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClubName(e.target.value);
    
    if(e.target.value.trim() === "") {
      setIsTitleValid(false);
      setTitleError("모임 제목을 입력해 주세요.");
    } else if (e.target.value.length > 14) {
      setIsTitleValid(false);
      setTitleError("제목은 최대 14자까지 작성할 수 있어요.");
    } else {
      setIsTitleValid(true);
      setTitleError("");
    }
  }

  const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setDescCount(e.target.value.length);
    
    if(e.target.value.trim() === "") {
      setIsDescValid(false);
      setDescError("소개글을 입력해 주세요.");
    } else if (e.target.value.length > 1000) {
      setIsDescValid(false);
      setDescError("소개글은 최대 1,000자까지 작성할 수 있어요.");
    } else {
      setIsDescValid(true);
      setDescError("");
    }
  }

  return (
    <div className={`desc-container ${className}`}>
      <label className="up-wrapper">
        <Label labelTitle="모임 소개"/>
        <input 
          type="text"
          placeholder="제목을 입력해 주세요."
          className="club-title-input"
          maxLength={14}
          value={clubName}
          onChange={handleTitleChange}
        />
        {!isTitleValid && (
          <span className="err-message">{titleError}</span>
        )}
      </label>
      <div className="desc-wrapper">
        <div className="area-wrapper">
          <textarea 
            name="clubDescription" 
            placeholder={`게시한 글에 욕설, 음란물 및 비방적인 내용의 글이나 사진, 영상이 포함될 경우,\n사전 예고없이 삭제 또는 비공개 처리될 수 있음을 알려 드립니다.`}
            className="club-description-textarea"
            maxLength={1000}
            value={description}
            onChange={handleDescChange}
          ></textarea>
          <div className="text-count">{`(${descCount}/1,000자)`}</div>
        </div>
        {!isDescValid && (
          <span className="err-message">{descError}</span>
        )}
      </div>
    </div>
  );
};

export default ClubDescription;