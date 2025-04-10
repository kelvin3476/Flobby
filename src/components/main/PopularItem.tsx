import React from "react";
import Tag from "./Tag";

import "../../styles/main/PopularItem.scss";

interface PopularItemProps {
  tag: string;
  title: string;
  likes: number;
  date: string;
}

const PopularItem = ({ tag, title, likes, date }: PopularItemProps) =>  {

  return (
    <div className="item-container">
      <div className="item-wrapper">
        <div className="item-top">
          <div className="item-tag">
            <Tag label={tag} type="size"/>
          </div>
        </div>

        <div className="item-content">
          <p className="item-title">{title}</p>
          <div className="item-meta">
            <div className="likes">
              <span className="like-icon" />
              <span className="like-count">{likes}</span>
            </div>
            <span className="date">{date}</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PopularItem;