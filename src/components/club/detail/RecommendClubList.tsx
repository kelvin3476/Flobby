import React from 'react';
import Title from '@/components/club/text/Title';
import { clubItem, RecommendClubListItem } from '@/api/ApiTypes';
import ClubItem from '@/components/main/club/ClubItem';
import '@/styles/club/detail/RecommendClubList.scss';

interface RecommendClubListProps {
  recommendClubList: RecommendClubListItem[] | clubItem[];
  isDetailPage: boolean;
  pageType?: string; // 페이지 타입 (예: 'search', 'detail')
}

const RecommendClubList = ({
  recommendClubList,
  isDetailPage,
  pageType,
}: RecommendClubListProps) => {
  return (
    <div className="recommend-club-list-container">
      <Title
        className="club-detail-item-sub-title"
        titleName={pageType === 'search' ? '이런 모임은 어때요?' : '이 모임과 비슷한 모임이에요'}
      />
      <div className="recommend-club-list">
        {recommendClubList.map((recommendClubItem, index) => {
          return (
            <ClubItem
              key={index}
              clubId={recommendClubItem.clubId}
              clubName={recommendClubItem.clubName}
              photo={recommendClubItem.clubImage ? recommendClubItem.clubImage : recommendClubItem.photo}
              category={recommendClubItem.mainCategory ? recommendClubItem.mainCategory : recommendClubItem.category}
              subCategory={recommendClubItem.subCategory}
              currentMembers={recommendClubItem.currentMembers}
              maxMember={JSON.stringify(recommendClubItem.maxMembers) ? JSON.stringify(recommendClubItem.maxMembers) : JSON.stringify(recommendClubItem.maxMember)}
              locationName={recommendClubItem.location ? recommendClubItem.location : recommendClubItem.locationName}
              isDetailPage={isDetailPage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecommendClubList;
