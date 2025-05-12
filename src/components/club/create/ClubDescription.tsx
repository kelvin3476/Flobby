import React from "react";
import Label from "./Label";

import "../../../styles/club/create/ClubDescription.scss";

const ClubDescription = () => {
  return (
    <div className="desc-container">
      <label className="up-wrapper">
        <Label labelTitle="모임 소개"/>
        <input 
          type="text"
          placeholder="제목을 입력해 주세요."
          className="club-title-input"
          maxLength={14}
        />
      </label>
      <textarea 
        name="clubDescription" 
        placeholder={`게시한 글에 욕설, 음란물 및 비방적인 내용의 글이나 사진, 영상이 포함될 경우,\n사전 예고없이 삭제 또는 비공개 처리될 수 있음을 알려 드립니다.`}
        className="club-description-textarea"
        maxLength={1000}
      ></textarea>
    </div>
  );
};

export default ClubDescription;