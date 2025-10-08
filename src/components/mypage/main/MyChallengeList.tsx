import React from 'react';

import { ChallengeItem } from '@/api/ApiTypes';
import ChallengeItemHorizontal from './ChallengeItemHorizontal';

import '@/styles/mypage/MyChallengeList.scss';

interface MyChallengeListProps {
  challengeType: string; // ex) 진행중, 종료, ...
  challengeList: ChallengeItem[];
}

const MyChallengeList = ({
  challengeType,
  challengeList,
}: MyChallengeListProps) => {
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
    <div className="my-challenge-list-container">
      <div className="my-challenge-list-header">
        <span>{title}</span>
        <div
          className="my-challenge-list-link-to-all-btn-container"
          onClick={() => {
            // TODO: 클릭시 각 챌린지 전체 보기 페이지로 이동
            console.log('전체 보기 버튼 클릭!');
          }}
        >
          <span>전체 보기</span>
          <div className="my-challenge-list-link-to-all-icon-next"></div>
        </div>
      </div>

      {challengeList ? (
        challengeList?.map(item => {
          return (
            <ChallengeItemHorizontal
              key={item.challengeId}
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
        })
      ) : (
        <div className="my-challenge-list-empty">
          <div className="my-challenge-list-empty-text">
            진행 중인 챌린지가 없어요
            <br />
            새로운 챌린지를 시작해 보세요
          </div>
        </div>
      )}
    </div>
  );
};

export default MyChallengeList;
