import React from 'react';
import '@/styles/mypage/ChallengeNavigatore.scss';

const challengeNavigatorData = [
  { type: 'inProgress', label: '진행중인 챌린지', count: 5 },
  { type: 'completed', label: '종료된 챌린지', count: 3 },
  { type: 'interested', label: '관심 챌린지', count: 3 },
  { type: 'recentlyViewed', label: '최근 본 챌린지', count: 3 },
];
const ChallengeNavigator = () => {
  return (
    <div className="challenge-navigator-wrapper">
      {challengeNavigatorData?.map(data => {
        return (
          <div
            className="challenge-navigator-item-box"
            onClick={() => console.log(`${data.label} box click!`)}
          >
            <div className="challenge-navigator-item-label">{data.label}</div>
            <div className="challenge-navigator-item-count">
              <span>{data.count}</span>
              <span>개</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChallengeNavigator;
