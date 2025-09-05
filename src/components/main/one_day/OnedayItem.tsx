import React from 'react';

import Tag from '@/components/tag/Tag';

import "@/styles/main/one_day/OnedayItem.scss";

interface OnedayItemProps {
  category: string;
  title: string;
  locationName: string;
  currentMembers: number;
  maxMembers: number;
  scheduledDate: string;
  nickname: string;
  hostId: number;
  profilePhoto: string;
  imageUrl: string;
}

const OnedayItem = ({ category, title, locationName, currentMembers, maxMembers, scheduledDate, nickname, profilePhoto, imageUrl }: OnedayItemProps) => {
  const [isHeartActive, setIsHeartActive] = React.useState(false);

  return (
    /* 원데이 아이템 컨테이너 */
    <div className="one-day-item-container" onClick={() => console.log('원데이 아이템 클릭!!!')}>
      {/* 원데이 아이템 썸네일 */}
      <div className="one-day-item-thumbnail-wrapper">
        <img src={imageUrl ? imageUrl : '/img/main/one_day/thumbnail2.png'} alt="one-day-item-thumbnail-image" />
        {/* TODO: 썸네일 내부 하트 아이콘 클릭시 관심 원데이로 등록 하는 api 필요 */}
        <div className="one-day-item-heart-icon-wrapper">
          <span
            className={`one-day-item-thumbnail-heart-icon ${isHeartActive ? 'active' : ''}`}
            onClick={(event) => {
              event.stopPropagation()
              console.log('관심 원데이 아이콘 toggle!!');
              setIsHeartActive((prev) => !prev);
            }}
          ></span>
        </div>
      </div>

      {/* 원데이 아이템 내용 */}
      <div className="one-day-item-content-container">
        {/* 원데이 아이템 태그 */}
        <div className="one-day-item-tag-container">
          <Tag label={category} type="one-day" color="purple" />
        </div>

        {/* 원데이 아이템 정보 */}
        <div className="one-day-item-information-container">
          {/* 원데이 이름 */}
          <div className="one-day-class-name">{title}</div>

          <div className="one-day-item-information-sub-container">
            {/* 원데이 위치 */}
            <div className="one-day-item-location-container">
              <span className="one-day-item-location-icon"></span>
              <span className="one-day-item-location">{locationName}</span>
            </div>

            <span className="one-day-item-divider-icon"></span>

            {/* 원데이 현재 인원 및 최대 인원 */}
            <div className="one-day-item-current-members-container">
              <span className="one-day-item-current-members-icon"></span>
              <div className="one-day-item-member-container">
                <span className="one-day-item-member-count">
                  <span className="one-day-item-member-number">{currentMembers}</span>/{maxMembers}
                </span>
                <span className="one-day-item-member-postfix">명</span>
              </div>
            </div>

            <span className="one-day-item-divider-icon"></span>

            {/* 원데이 캘린더 일정 */}
            <div className="one-day-item-scheduled-date-container">
              <span className="one-day-item-scheduled-date-icon"></span>
              <span className="one-day-item-scheduled-date">{new Date(scheduledDate).toISOString().slice(5, 10).replace("-", ".")}</span>
            </div>
          </div>

          {/* 원데이 작성자 */}
          <div className="one-day-item-writer-container">
            <img src={profilePhoto ? profilePhoto : '/img/main/one_day/profile1.png'} alt="one-day-item-writer-profile-photo" />
            <span className="one-day-item-writer-nickname">{nickname ? nickname : '닉네임'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnedayItem;