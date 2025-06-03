import React from 'react';
import Title from '../text/Title';
import { RecommendClubListItem } from '../../../api/ApiTypes';
import ClubItem from '../../main/club/ClubItem';
import '../../../styles/club/detail/RecommendClubList.scss';

interface RecommendClubListProps {
  recommendClubList: RecommendClubListItem[];
  isDetailPage: boolean;
}

const RecommendClubList = ({
  recommendClubList,
  isDetailPage,
}: RecommendClubListProps) => {
  return (
    <div className="recommend-club-list-container">
      <Title
        className="club-detail-item-sub-title"
        titleName="이 모임과 비슷한 모임이에요"
      />
      <div className="recommend-club-list">
        {recommendClubList.map((recommendClubItem, index) => {
          if (index > 3) return null;

          return (
            <ClubItem
              clubId={recommendClubItem.clubId}
              clubName={recommendClubItem.clubName}
              photo={recommendClubItem.clubImage}
              category={'스포츠'} // TODO: 백엔드 수정 요청
              subCategory={recommendClubItem.subCategory}
              currentMembers={recommendClubItem.currentMembers}
              maxMember={recommendClubItem.maxMembers.toString()}
              locationName={recommendClubItem.location}
              isDetailPage={isDetailPage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendClubList;
