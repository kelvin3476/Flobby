import React from 'react';
import { useNavigate } from 'react-router-dom';

import Tag from '@/components/tag/Tag';

import '@/styles/main/club/ClubItem.scss';

interface ClubItemProps {
  clubId: number;
  photo: string;
  hostId?: number;
  hostNickname?: string;
  category: string;
  maxMember: string;
  clubName: string;
  locationName: string;
  currentMembers: number;
  className?: string;
  postCategory?: string;
  subCategory?: string;
  isDetailPage?: boolean;
}

const ClubItem = ({
  clubId,
  category,
  maxMember,
  clubName,
  locationName,
  currentMembers,
  photo,
  className,
  postCategory,
  subCategory,
  isDetailPage,
}: ClubItemProps) => {
  const navigate = useNavigate();
  const [isHeartActive, setIsHeartActive] = React.useState(false);

  return (
    /* 모임 아이템 컨테이너 */
    <div
      className={`club-item-container ${className ? className : ''}`}
      onClick={() => navigate(`/club/${clubId}`)}
    >
      {/* 모임 아이템 썸네일 */}
      <div className="club-item-thumbnail-wrapper">
        <img
          src={photo ? photo : '/img/main/club/thumbnail1.png'}
          alt="club-item-thumbnail-image"
        />
        {/* TODO: 썸네일 내부 하트 아이콘 클릭시 관심 모임 으로 등록 하는 api 필요 */}
        <div className="club-item-heart-icon-wrapper">
          <span
            className={`club-item-thumbnail-heart-icon ${isHeartActive ? 'active' : ''}`}
            onClick={event => {
              event.stopPropagation();
              console.log('관심 모임 아이콘 toggle!!');
              setIsHeartActive(prev => !prev);
            }}
          ></span>
        </div>
      </div>

      {/* 모임 아이템 내용 */}
      <div className="club-item-content-container">
        {/* 모임 아이템 태그 */}
        <div className="club-item-tag-container">
          <Tag
            label={subCategory}
            type="club"
            color="purple"
          />
        </div>

        {/* 모임 아이템 정보 */}
        <div className="club-item-information-container">
          {/* 모임 이름 */}
          <div className="club-item-club-name">{clubName}</div>

          <div className="club-item-information-sub-container">
            {/*/!* 모임 *!/*/}
            {/*{postCategory && (*/}
            {/*  <>*/}
            {/*    <div className="club-item-post-category-container">*/}
            {/*      <span className="club-item-post-category">*/}
            {/*        {postCategory}*/}
            {/*      </span>*/}
            {/*    </div>*/}

            {/*    <span className="club-item-divider-icon"></span>*/}
            {/*  </>*/}
            {/*)}*/}
            {/* 모임 위치 */}
            <div className="club-item-location-container">
              {/*{isDetailPage && <div className="club-item-location-icon"></div>}*/}
              <div className="club-item-location-icon"></div>
              <span className="club-item-location">{locationName}</span>
            </div>

            <span className="club-item-divider-icon"></span>

            {/* 모임 현재 인원 */}
            <div className="club-item-current-members-container">
              <span className="club-item-current-members-icon"></span>
              <div className="club-item-member-container">
                <span className="club-item-member-count">
                  <span className="club-item-member-number">
                    {currentMembers}
                  </span>
                  /{maxMember} 명
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
