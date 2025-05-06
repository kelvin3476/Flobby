import React, { useState, useEffect } from "react";
import Main from "../../../api/main/Main";
import PopularItem from "./PopularItem";

import "../../../styles/main/popular_post/PopularPost.scss";

const PopularPost = () => {
  const [ boardItems, setBoardItems ] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {

      try {
        const response = await Main.getMainData();
        const { code, message, data } = response.data;

        if (code === 1000) {
          const sortedItems  = [...data.boardItems].sort((a,b) => b.likes - a.likes);
          // API 호출 성공
          setBoardItems(sortedItems);
        } else if (code === 1001) {
          // API 호출 실패
          throw new Error(message || "데이터를 가져오지 못했습니다.");
        } else if (code === 1002) {
          // API 예외 발생
          throw new Error(message || "서버 오류가 발생했습니다.");
        }
      } catch (err: any) {
        console.log(err.message || "데이터 로드 실패");
      }
    };

    fetchPosts();
  }, []);

  const renderedItems = boardItems.map((item, idx) => (
    <PopularItem 
      key={item.id}
      tag={"언어 / 외국어"} // TODO: 백엔드 작업 완료 후 수정
      title={item.title}
      likes={item.likes}
      date={item.created_at}
    />
  ))
  
  return (
    <div className="popular-container">
      <div className="popular-title">
        <span>실시간 인기 게시글</span>
        <button>전체 보기</button>
      </div>
      <section className="popular-section">
        <div className="left-section">
          {renderedItems.filter((_, idx) => idx < 5)}
        </div>
        <div className="right-section">
          {renderedItems.filter((_, idx) => idx >= 5)}
        </div>
      </section>
    </div>
  );
};

export default PopularPost;