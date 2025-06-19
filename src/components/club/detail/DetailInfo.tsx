import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Tag from '../../tag/Tag';
import Button from '../../button/Button';
import DropDownModal from '../../modal/DropDownModal';
import ClubModal from '../../modal/ClubModal';
import ClubTextModal from '../../modal/ClubTextModal';

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
  const [modalStep, setModalStep] = useState<null | "text" | "confirm" | "complete">(null);
  const [modalMode, setModalMode] = useState<null | "greeting" | "report">(null);

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
        // nav(`/club/edit/${clubId}`);
        nav('/club/edit', { state: clubId });
        break;
      case '정기 모임 등록':
        nav(`/club/${clubIds}/clubmeeting/register`); // TODO: 추후 수정
        break;
      case '멤버 관리':
        nav('/club/member/manage'); // TODO: 추후 수정
        break;
      case '모임 신고':
        setModalMode("report");
        setModalStep("text");
        break;
      case '모임 탈퇴':
        // TODO: 모달창 로직 추가
        Main.leaveClub(Number(clubId)); /* 모임 탈퇴 api 적용 */
        break;
    }
  };

  const handleModalSubmit = async() => {
    if (modalMode === "greeting") {
      await Main.applyClub(Number(clubId));
    } else if (modalMode === "report") {
      // TODO: 모임 신고 api 추가하기
    }
    setModalStep("complete");
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
              if (!accessToken) {
                nav('/login');
                return;
              }
              setModalMode("greeting");
              setModalStep("text");
            }}
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

      {modalStep === "text" && modalMode && (
        <ClubTextModal 
          type={modalMode}
          title={modalMode === "greeting" ? "가입 인사를 작성해 주세요!" : "신고하려는 이유가 무엇인가요?"}
          onClose={() => {
            setModalStep(null);
            setModalMode(null);
          }}
          onSubmit={() => setModalStep("confirm")}
        />
      )}
      
      {(modalStep === "confirm" || modalStep === "complete") && modalMode && (
        <ClubModal 
          mainMessage={
            modalStep === "confirm" 
              ? (modalMode === "greeting" 
                ? "모임에 가입할까요?" 
                : "모임을 신고할까요?") 
              : (modalMode === "greeting" 
                ? "모임 가입이 완료되었어요!" 
                : "모임 신고가 완료되었어요!")
          }
          subMessage={
            modalStep === "confirm"
              ? (modalMode === "greeting" 
                ? "작성하신 가입 인사는 모임 게시판에 업로드됩니다."
                : undefined
              )
              : undefined
          }
          showIcon={modalStep === "confirm"}
          iconType={modalMode === "greeting" ? "check" : "warn"}
          showCancelButton={modalStep === "confirm"}
          onConfirm={async() => {
            if (modalStep === "confirm") {
              await handleModalSubmit();
            } else if (modalStep === "complete") {
              setModalStep(null);
              setModalMode(null);
            }
          }}
          onCancel={() => setModalStep(null)}
        />
      )}
    </div>
  );
};

export default DetailInfo;
