import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularItem from "./PopularItem";
import { RegionContextController } from "../../../services/region/controllers/RegionContextController";
import { boardItem } from "../../../api/ApiTypes";

import "../../../styles/main/popular_post/PopularPost.scss";

const PopularPost: React.FC = () => {
  const navigate = useNavigate();
  const [ boardItems, setBoardItems ] = useState<boardItem[]>([]);
  const popularController = RegionContextController.getInstance();

  useEffect(() => {
    popularController.getMainData().then((item) => {
      const sortedItems = [...item.boardItems].sort((a, b) => b.likes - a.likes);
      setBoardItems(sortedItems);
    })
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
        <button onClick={() => navigate('/community/all')}>전체 보기</button>
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