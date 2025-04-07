import React from "react";
import PopularItem from "./PopularItem";

import "../../styles/main/PopularPost.scss";

const PopularPost = () => {

  const mockArray = Array(10).fill(null);
  const leftList = mockArray.slice(0,5);
  const rightList = mockArray.slice(5,10);
  
  return (
    <div className="popular-container">
      <div className="popular-title">
        <span>실시간 인기 게시글</span>
        <button>전체 보기</button>
      </div>
      <section className="popular-section">
        <div className="left-section">
          {leftList.map((_, idx) => (
            <PopularItem key={`left-${idx}`} />
          ))}
        </div>
        <div className="right-section">
          {rightList.map((_, idx) => (
            <PopularItem key={`right-${idx}`} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularPost;