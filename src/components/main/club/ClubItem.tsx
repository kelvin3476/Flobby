import React from 'react';

import Tag from '../../tag/Tag';

import "../../../styles/main/club/ClubItem.scss";

interface ClubItemProps {
  category: string;
  scale: string;
  clubName: string;
  locationName: string;
  currentMembers: number;
  imageUrl: string;
}

const ClubItem = ({ category, scale, clubName, locationName, currentMembers, imageUrl }: ClubItemProps) => {
  const [isHeartActive, setIsHeartActive] = React.useState(false);

  return (
    /* 모임 아이템 컨테이너 */
    <div className="club-item-container" onClick={() => console.log('관심 모임 아이템 클릭!!!')}>
      {/* 모임 아이템 썸네일 */}
      <div className="club-item-thumbnail-wrapper">
        {/* TODO: imageUrl 있을땐 해당 모임 아이템의 imageUrl 이 나올 예정 아닐 경우 기본 썸네일 이미지 표출 (추후 이미지 완료 된 경우 다시 처리 필요) */}
        <img src={imageUrl ? imageUrl : '/img/main/club/thumbnail1.png'} alt="club-item-thumbnail-image" />
        {/* TODO: 썸네일 내부 하트 아이콘 클릭시 관심 모임 으로 등록 하는 api 필요 */}
        <div className="club-item-heart-icon-wrapper">
          <span
            className={`club-item-thumbnail-heart-icon ${isHeartActive ? 'active' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              console.log('관심 모임 아이콘 toggle!!');
              setIsHeartActive((prev) => !prev);
            }}
          ></span>
        </div>
      </div>

      {/* 모임 아이템 내용 */}
      <div className="club-item-content-container">
        {/* 모임 아이템 태그 */}
        <div className="club-item-tag-container">
          <Tag label={category} type="club" color="purple" />
          <Tag label={scale} type="club" color="gray" />
        </div>

        {/* 모임 아이템 정보 */}
        <div className="club-item-information-container">
          {/* 모임 이름 */}
          <div className="club-item-club-name">{clubName}</div>

          <div className="club-item-information-sub-container">
            {/* 모임 위치 */}
            <div className="club-item-location-container">
              <span className="club-item-location-icon"></span>
              <span className="club-item-location">{locationName}</span>
            </div>

            <span className="club-item-divider-icon"></span>

            {/* 모임 현재 인원 */}
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