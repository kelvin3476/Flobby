import React from "react";

import Title from "../text/Title";

import "../../../styles/club/detail/DetailDescription.scss";

interface DetailDescriptionProps {
  description: string;
}

const DetailDescription = ({description}: DetailDescriptionProps) => {
  return (
    <div className="club-detail-desc-container">
      <Title className="club-detail-item-sub-title" titleName="모임 정보" />
      <div className="club-detail-desc-content">{description}</div>
    </div>
  );
};

export default DetailDescription;