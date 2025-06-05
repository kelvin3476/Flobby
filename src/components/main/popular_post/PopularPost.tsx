import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularItem from "./PopularItem";
import { boardItem, MainData } from '../../../api/ApiTypes';

import "../../../styles/main/popular_post/PopularPost.scss";

interface BoardPostProps {
  mainDataList: MainData;
  setMainDataList: React.Dispatch<React.SetStateAction<MainData>>;
}

const PopularPost: React.FC<BoardPostProps> = ({ mainDataList, setMainDataList }: BoardPostProps) => {
  const navigate = useNavigate();
  const [ boardItems, setBoardItems ] = useState<boardItem[]>([]);

  useEffect(() => {
    /* 최초 화면 진입 후 렌더링 시 호출 */
    setMainDataList(mainDataList);
    /* 초기 인기 게시글 데이터 설정 */
    setBoardItems([...mainDataList.boardItems]);
  }, [mainDataList]);

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