import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Tag from '../../tag/Tag';
import Button from '../../button/Button';
import DropDownModal from '../../modal/DropDownModal';

import Main from '../../../api/main/Main';

import '../../../styles/club/detail/DetailInfo.scss';

interface DetailInfoProps {
  accessToken: string | null;
  clubId: string;
  role: string | null;
  isMember: boolean;
  clubName: string;
  location: string;
  currentMembers: number;
  maxMembers: number;
  clubImage: string;
  subCategory: string;
}

const DetailInfo = ({
  accessToken,
  clubId,
  role,
  isMember,
  clubName,
  location,
  currentMembers,
  maxMembers,
  clubImage,
  subCategory,
}: DetailInfoProps) => {
  const [isOptionClicked, setIsOptionClicked] = useState(false);
  const nav = useNavigate();
  const { clubIds } = useParams<{ clubIds: string }>();

  let optionItems: string[] = [];
  if (role === 'LEADER') {
    // 모임장일 경우
    optionItems = ['모임 수정', '정기 모임 등록', '멤버 관리'];
  } else if (isMember && role !== null) {
    // 운영진 포함 모임 가입자의 경우
    optionItems = ['정기 모임 등록', '모임 신고', '모임 탈퇴'];
  } else {
    // 모임 미가입자의 경우
    optionItems = ['모임 신고'];
  }

  const handleItemClick = (item: string) => {
    switch (item) {
      case '모임 수정':
        nav('/club/edit/:id'); // TODO: 추후 수정
        break;
      case '정기 모임 등록':
        nav(`/club/${clubIds}/clubmeeting/register`); // TODO: 추후 수정
        break;
      case '멤버 관리':
        nav('/club/member/manage'); // TODO: 추후 수정
        break;
      case '모임 신고':
        // TODO: 모달창 로직 추가
        break;
      case '모임 탈퇴':
        // TODO: 모달창 로직 추가
        break;
    }
  };

  return (
    <div className="detail-info-container">
      <img src={clubImage} alt="club-detail-info-image" />
      <div className="detail-info-content">
        <div className="info-content-form">
          <div className="info-content-items">
            <Tag label={subCategory} type="club" color="purple" />
            <div className="info-items-btns">
              <button className="items-btns-heart"></button>
              <button
                className="items-btns-option"
                onClick={() => setIsOptionClicked(prev => !prev)}
              ></button>
            </div>
          </div>
          <div className="info-content-titles">
            <div className="info-content-club-name">{clubName}</div>
            <div className="info-content-inner">
              <div className="titles-inner-location-container">
                <span className="titles-inner-location-icon"></span>
                <span className="titles-inner-location">{location}</span>
              </div>

              <span className="info-content-divider-icon"></span>

              <div className="titles-inner-current-members-container">
                <span className="titles-inner-member-icon"></span>
                <div className="titles-inner-member-container">
                  <span className="titles-inner-member-count">
                    <span className="titles-inner-member-number">
                      {currentMembers}
                    </span>
                    /{maxMembers}
                  </span>
                  <span className="titles-inner-member-postfix">명</span>
                </div>
              </div>
            </div>
          </div>
          {isOptionClicked && (
            <DropDownModal
              className="club-detail-option-modal"
              items={optionItems}
              onItemClick={handleItemClick}
            />
          )}
        </div>
        {role === null ? (
          <Button
            type="button"
            className="info-content-btn-yes"
            onClick={() => {
              accessToken ? Main.applyClub(Number(clubId)) : nav('/login');
            }} // TODO: 가입인사 모달창 추가하기
            title="가입 신청하기"
          />
        ) : (
          <Button
            type="button"
            className="info-content-btn-no"
            onClick={() => {}}
            title="가입된 모임이에요!"
          />
        )}
      </div>
    </div>
  );
};

export default DetailInfo;
