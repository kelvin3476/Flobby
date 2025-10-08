import React from 'react';
import { useNavigate } from 'react-router-dom';

import Tag from '@/components/tag/Tag';

import '@/styles/main/club/ChallengeItem.scss';

interface ChallengeItemProps {
  clubId: number;
  photoUrl: string;
  // hostId?: number;
  // hostNickname?: string;
  mainCategory: string;
  maxMember: number;
  clubName: string;
  regionName: string;
  currentMember: number;
  className?: string;
  // postCategory?: string;
  // subCategory?: string;
  // isDetailPage?: boolean;
  recruitDday?: string;
}

const ChallengeItem = ({
  clubId,
  mainCategory,
  maxMember,
  clubName,
  regionName,
  currentMember,
  photoUrl,
  className,
  recruitDday,
}: ChallengeItemProps) => {
  const navigate = useNavigate();
  const [isHeartActive, setIsHeartActive] = React.useState(false);

  return (
    /* 모임 아이템 컨테이너 */
    <div
      className={`challenge-item-container ${className ? className : ''}`}
      onClick={() => navigate(`/club/${clubId}`)}
    >
      {/* 모임 아이템 썸네일 */}
      <div className="challenge-item-thumbnail-wrapper">
        <img
          src={photoUrl ? photoUrl : '/img/main/club/thumbnail1.png'}
          alt="challenge-item-thumbnail-image"
        />
        {/* TODO: 썸네일 내부 하트 아이콘 클릭시 관심 모임 으로 등록 하는 api 필요 */}
        <div className="challenge-item-heart-icon-wrapper">
          <span
            className={`challenge-item-thumbnail-heart-icon ${isHeartActive ? 'active' : ''}`}
            onClick={event => {
              event.stopPropagation();
              console.log('관심 모임 아이콘 toggle!!');
              setIsHeartActive(prev => !prev);
            }}
          ></span>
          <span className="challenge-item-d-day">
            {recruitDday ?? '모집 D-12'}
          </span>
        </div>
      </div>

      {/* 모임 아이템 내용 */}
      <div className="challenge-item-content-container">
        {/* 모임 이름 */}
        <div className="challenge-item-club-name">{clubName}</div>

        {/* 모임 아이템 정보 */}
        <div className="challenge-item-information-container">
          {/* 모임 아이템 태그 */}
          <div className="challenge-item-tag-container">
            <Tag label={mainCategory} type="challenge" color="purple" />
          </div>

          <div className="challenge-item-information-sub-container">
            {/*/!* 모임 *!/*/}
            {/*{postCategory && (*/}
            {/*  <>*/}
            {/*    <div className="challenge-item-post-category-container">*/}
            {/*      <span className="challenge-item-post-category">*/}
            {/*        {postCategory}*/}
            {/*      </span>*/}
            {/*    </div>*/}

            {/*    <span className="challenge-item-divider-icon"></span>*/}
            {/*  </>*/}
            {/*)}*/}
            {/* 모임 위치 */}
            <div className="challenge-item-location-container">
              {/*{isDetailPage && <div className="challenge-item-location-icon"></div>}*/}
              <div className="challenge-item-location-icon"></div>
              <span className="challenge-item-location">{regionName}</span>
            </div>

            <span className="challenge-item-divider-icon"></span>

            {/* 모임 현재 인원 */}
            <div className="challenge-item-current-members-container">
              <span className="challenge-item-current-members-icon"></span>
              <div className="challenge-item-member-container">
                <span className="challenge-item-member-count">
                  <span className="challenge-item-member-number">
                    {currentMember}
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

export default ChallengeItem;
