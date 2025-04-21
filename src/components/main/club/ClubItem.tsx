import React from 'react';

import Tag from '../../tag/Tag';

import "../../../styles/main/club/ClubItem.scss";

interface ClubItemProps {
  category: string;
  scale: string;
  clubName: string;
  location: string;
  currentMembers: number;
  imageUrl: string;
}

const ClubItem = ({ category, scale, clubName, location, currentMembers, imageUrl }: ClubItemProps) => {
  const [isHeartActive, setIsHeartActive] = React.useState(false);

  return (
    /* 동호회 아이템 컨테이너 */
    <div className="club-item-container" onClick={() => console.log('관심 동호회 아이템 클릭!!!')}>
      {/* 동호회 아이템 썸네일 */}
      <div className="club-item-thumbnail-wrapper">
        <img src={imageUrl} alt="club-item-thumbnail-image" />
        {/* TODO: 썸네일 내부 하트 아이콘 클릭시 관심 동호회로 등록 하는 api 필요 */}
        <div className="club-item-heart-icon-wrapper">
          <span
            className={`club-item-thumbnail-heart-icon ${isHeartActive ? 'active' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              console.log('관심 동호회 아이콘 toggle!!');
              setIsHeartActive((prev) => !prev);
            }}
          ></span>
        </div>
      </div>

      {/* 동호회 아이템 내용 */}
      <div className="club-item-content-container">
        {/* 동호회 아이템 태그 */}
        <div className="club-item-tag-container">
          <Tag label={category} type="club" color="purple" />
          <Tag label={scale} type="club" color="gray" />
        </div>

        {/* 동호회 아이템 정보 */}
        <div className="club-item-information-container">
          {/* 동호회 이름 */}
          <div className="club-item-club-name">{clubName}</div>

          <div className="club-item-information-sub-container">
            {/* 동호회 위치 */}
            <div className="club-item-location-container">
              <span className="club-item-location-icon"></span>
              <span className="club-item-location">{location}</span>
            </div>

            <span className="club-item-divider-icon"></span>

            {/* 동호회 현재 인원 */}
            <div className="club-item-current-members-container">
              <span className="club-item-current-members-icon"></span>
              <div className="club-item-member-container">
                <span className="club-item-member">멤버</span>
                <span className="club-item-member-count">
                  <span className="clum-item-member-number">{currentMembers}</span>명
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubItem;