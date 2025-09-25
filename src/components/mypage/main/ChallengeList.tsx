import React from 'react';

import '@/styles/mypage/ChallengeList.scss';
import { ChallengeData } from '@/api/ApiTypes';
import Button from '@/components/button/Button';
import ChallengeItemHorizontal from './ChallengeItemHorizontal';

interface ChallengeListProps {
  challengeType: string; // ex) 진행중, 종료, ...
  challengeList: ChallengeData[];
}

const ChallengeList = ({
  challengeType,
  challengeList,
}: ChallengeListProps) => {
  let title;
  switch (challengeType) {
    case 'progress':
      title = '진행중인 챌린지';
      break;
    case 'completed':
      title = '종료된 챌린지';
      break;
    default:
      title = '진행중인 챌린지';
  }

  return (
    <div className="challenge-list-container">
      <div className="challenge-list-header">
        <span>{title}</span>
        <div
          className="challenge-list-link-to-all-btn-container"
          onClick={() => {
            // TODO: 해당 챌린지 전체 보기 페이지로 이동
            console.log('전체 보기 버튼 클릭!');
          }}
        >
          <span>전체 보기</span>
          <div className="challenge-list-link-to-all-icon-next"></div>
        </div>
      </div>

      {challengeList?.map(item => {
        return (
          <ChallengeItemHorizontal
            challengeId={item.challengeId}
            challengeName={item.challengeName}
            mainCategory={item.mainCategory}
            subCategory={item.subCategory}
            maxMember={item.maxMember}
            currentMember={item.currentMember}
            regionId={item.regionId}
            regionName={item.regionName}
            mainPhotoUrl={item.mainPhotoUrl}
            recruitEndDate={item.recruitEndDate}
            recruitDday={item.recruitDday}
            wishCount={item.wishCount}
            recruitFlag={item.recruitFlag}
            createdAt={item.createdAt}
          />
        );
      })}
    </div>
  );
};

export default ChallengeList;
