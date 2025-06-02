import React from 'react';
import Title from '../text/Title';
import '../../../styles/club/detail/ClubMemberList.scss';

const ClubMemberList = () => {
  return (
    <div className="club-detail-member-container">
      <div className="club-detail-member-title-box">
        <Title className="club-detail-item-sub-title" titleName="멤버 소개" />
        <div className="club-detail-member-admin-button-container">
          <div className="club-detail-member-admin-icon"></div>
          <div className="club-detail-member-admin-text">
            <span>멤버 관리</span>
          </div>
        </div>
      </div>
      {/* 멤버리스트 map */}
      <div className="club-member-list-container"></div>
      {/* 멤버 더보기 버튼 */}
    </div>
  );
};

export default ClubMemberList;
