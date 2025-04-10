import React from "react";
import PopularItem from "./PopularItem";

import "../../styles/main/PopularPost.scss";

// TODO: API 연동 시 해당 부분을 실제 백엔드 응답 데이터로 대체
const mockPosts = Array(10).fill(null).map((_, idx) => ({
  tag: "언어/ 외국어",
  title: "안녕하세요! 배드민턴 모임에 들어가려면 운동 잘 해야 하나요? 잘 모르겠어요. 도와줘요",
  likes: 123,
  date: "2025.02.22"
}))

const PopularPost = () => {

  const leftList = mockPosts.filter((_, index) => index % 2 === 0);
  const rightList = mockPosts.filter((_, index) => index % 2 === 1);
  
  return (
    <div className="popular-container">
      <div className="popular-title">
        <span>실시간 인기 게시글</span>
        <button>전체 보기</button>
      </div>
      <section className="popular-section">
        <div className="left-section">
          {leftList.map((item, idx) => (
            <PopularItem 
              key={`left-${idx}`}
              tag={item.tag}
              title={item.title}
              likes={item.likes}
              date={item.date}
            />
          ))}
        </div>
        <div className="right-section">
          {rightList.map((item, idx) => (
            <PopularItem 
              key={`right-${idx}`} 
              tag={item.tag}
              title={item.title}
              likes={item.likes}
              date={item.date}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default PopularPost;