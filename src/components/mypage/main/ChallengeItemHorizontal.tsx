import React from 'react';

import '@/styles/mypage/ChallengeItemHorizontal.scss';
import Tag from '@/components/tag/Tag';

interface ChallengeItemProps {
  challengeId: number;
  challengeName: string;
  mainCategory: string;
  subCategory: string;
  maxMember: number;
  currentMember: number;
  regionId: number;
  regionName: string;
  photoUrl: string;
  recruitEndDate: string;
  recruitDday: string;
  wishCount: number;
  recruitFlag: boolean;
  createdAt: string;
}

const ChallengeItemHorizontal = ({
  challengeId,
  challengeName,
  mainCategory,
  subCategory,
  maxMember,
  currentMember,
  regionId,
  regionName,
  photoUrl,
  recruitEndDate,
  recruitDday,
  wishCount,
  recruitFlag,
  createdAt,
}: ChallengeItemProps) => {
  const [isHeartActive, setIsHeartActive] = React.useState(false);

  return (
    <div className="challenge-item-horizontal-container">
      <div className="challenge-item-horizontal-thumbnail-wrapper">
        <img
          src={photoUrl ? photoUrl : '/img/main/club/thumbnail1.png'}
          alt="challenge-item-horizontal-thumbnail-image"
        />
        {recruitFlag && (
          <span className="challenge-item-horizontal-d-day">{recruitDday}</span>
        )}
      </div>

      <div className="challenge-item-horizontal-content-wrapper">
        <div className="challenge-item-horizontal-content-top-box">
          <div
            className={`challenge-item-horizontal-challenge-title ${challengeName.length > 15 ? 'long' : ''}`}
          >
            {challengeName}
          </div>
          <div
            className={`challenge-item-horizontal-heart-icon ${isHeartActive ? 'active' : ''}`}
            onClick={() => {
              console.log('관심 모임 아이콘 toggle!!');
              setIsHeartActive(prev => !prev);
            }}
          ></div>
        </div>

        <Tag label={mainCategory} type="challenge" color="purple" />

        <div className="challenge-item-horizontal-content-bottom-box">
          <div className="challenge-item-horizontal-location-box">
            <div className="challenge-item-horizontal-location-icon"></div>
            <span className="challenge-item-horizontal-location-name">
              {regionName}
            </span>
          </div>

          <div className="challenge-item-horizontal-divider"></div>

          <div className="challenge-item-horizontal-member-box">
            <div className="challenge-item-horizontal-member-icon"></div>
            <div className="challenge-item-horizontal-member-count-box">
              <div className="challenge-item-horizontal-member-count">
                <span className="challenge-item-horizontal-current-member">
                  {currentMember}
                </span>
                /{maxMember}
              </div>
              <span className="challenge-item-horizontal-member-text">명</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeItemHorizontal;
