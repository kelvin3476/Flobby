import React from "react";

import "../../styles/main/PopularItem.scss";

// const mockPosts = [
//   {
//     tag: "언어 / 외국어"
//   },
// ];

const PopularItem = () =>  {
  return (
    <div className="item-container">
      <div className="item-wrapper">
        <div className="item-top">
          <div className="item-tag">
            <span>언어 / 외국어</span>
          </div>
        </div>

        <div className="item-content">
          <p className="item-title">
          안녕하세요! 배드민턴 모임에 들어가려면 운동 잘 해야 하나요? 잘 모르겠읍니다만...
          </p>
          <div className="item-meta">
            <div className="likes">
              <span className="like-icon" />
              <span className="like-count">123</span>
            </div>
            <span className="date">2025.02.22</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PopularItem;