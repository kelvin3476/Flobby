import React from 'react';

import { GetChallengeRecruitThumbnail } from '@/api/ApiTypes';
import Tag from '@/components/tag/Tag';
import { useNavigate } from 'react-router-dom';
// import { ModalRegionListController } from '@/services/region/controllers/ModalRegionListController';
import useClubCategoryStore from '@/store/club/useClubCategoryStore';

import '@/styles/challenge/detail/ChallengeDetailFloatingCard.scss';

interface ChallengeDetailFloatingCardProps {
  isParticipated: boolean;
  challengeRecruitThumbnail: GetChallengeRecruitThumbnail;
}

const ChallengeDetailFloatingCard = ({
  isParticipated,
  challengeRecruitThumbnail,
}: ChallengeDetailFloatingCardProps) => {
  const navigate = useNavigate();

  // TODO: 아이콘 텍스트 정의 필요
  const challengeIconText = [{ category: '자전거', iconText: '🚴' }];
  // const modalRegionListController = ModalRegionListController.getInstance();
  const { setMainCategory, setSubCategory } = useClubCategoryStore();

  const handleMoveToChallengeList = async () => {
    // TODO: 선택 지역 설정
    // await modalRegionListController.setSelectedRegion()
    // TODO: 카테고리명 통일 필요
    setMainCategory(challengeRecruitThumbnail?.mainCategory);
    setSubCategory(challengeRecruitThumbnail?.subCategory);
    navigate('/challenge/list');
  };

  return (
    <div className="challenge-detail-floating-card-wrapper">
      {/* 이미지 & 상세 설명 영역 */}
      <div className="challenge-detail-floating-card-container">
        {/* 이미지 영역 */}
        <div className="challenge-detail-floating-card-img-container">
          {/* 썸네일 */}
          <img
            src={
              //   challengeRecruitThumbnail?.mainImage ||
              '/img/challenge/detail/challenge-detail-floating-card-default-img.jpg'
            }
            alt="challenge main image"
          />

          {/* 좋아요 & 케밥 버튼 박스 */}
          <div className="challenge-detail-floating-card-img-button-box">
            <div className="challenge-detail-floating-card-like-button"></div>
            <div className="challenge-detail-floating-card-kebob-button"></div>
          </div>
        </div>

        {/* 챌린지 타이틀 컨테이너 */}
        <div className="challenge-detail-floating-card-title-container">
          {/* 챌린지 타이틀 */}
          <div className="challenge-detail-floating-card-title">
            {challengeRecruitThumbnail?.title}
          </div>

          {/* 챌린시 시작 dday */}
          {challengeRecruitThumbnail?.dday >= 0 ? (
            <Tag
              label={
                challengeRecruitThumbnail?.dday === 0
                  ? '오늘 시작'
                  : `${challengeRecruitThumbnail?.dday}일 후 시작`
              }
              type={'thumbnail'}
              color="purple"
            />
          ) : (
            <Tag label={'진행중'} type={'thumbnail'} color="green" />
          )}
        </div>

        {/* 챌린지 상세 정보 컨테이너 */}
        <div className="challenge-detail-floating-card-content-container">
          {/* 장소 */}
          <div className="challenge-detail-floating-card-region-container">
            <div className="challenge-detail-floating-card-region-label-box">
              <div className="challenge-detail-floating-card-region-icon"></div>
              <div className="challenge-detail-floating-card-region-label-text">
                장소
              </div>
            </div>

            <div className="challenge-detail-floating-card-region-text">
              {challengeRecruitThumbnail?.challengeRegion}
            </div>
          </div>

          {/* 모집인원 */}
          <div className="challenge-detail-floating-card-member-container">
            <div className="challenge-detail-floating-card-member-label-box">
              <div className="challenge-detail-floating-card-member-icon"></div>
              <div className="challenge-detail-floating-card-member-label-text">
                모집인원
              </div>
            </div>
            <div className="challenge-detail-floating-card-member-text-box">
              <div className="challenge-detail-floating-card-current-member-text">
                {challengeRecruitThumbnail?.currentMembers}
              </div>
              <div className="challenge-detail-floating-card-max-member-text">
                /{challengeRecruitThumbnail?.maxMembers}
              </div>
            </div>
          </div>

          {/* 챌린지 기간 */}
          <div className="challenge-detail-floating-card-period-container">
            <div className="challenge-detail-floating-card-period-label-box">
              <div className="challenge-detail-floating-card-period-icon"></div>
              <div className="challenge-detail-floating-card-period-label-text">
                챌린지 기간
              </div>
            </div>

            <div className="challenge-detail-floating-card-period-text">
              {`${challengeRecruitThumbnail?.period.split('-')[1]}/${challengeRecruitThumbnail?.period.split('-')[2]}까지`}
            </div>
          </div>
        </div>

        {/* 챌린지 카테고리 이동 버튼 */}
        <div
          className="challenge-detail-floating-card-category-button-container"
          onClick={handleMoveToChallengeList}
        >
          <div className="challenge-detail-floating-card-category-button-text-box">
            <div className="challenge-detail-floating-card-category-button-text-icon">
              {
                challengeIconText.find(
                  it => it.category === challengeRecruitThumbnail?.subCategory,
                )?.iconText
              }
            </div>
            <div className="challenge-detail-floating-card-category-button-text">
              {challengeRecruitThumbnail?.subCategory} 챌린지
            </div>
          </div>

          <div className="challenge-detail-floating-card-category-arrow-icon"></div>
        </div>
      </div>

      {/* TODO: api 모집 마감 Dday 추가 필요 */}
      {/* 참여하기 버튼 & 모집 마감 D-day 안내 */}
      <div className="challenge-detail-floating-card-button-container">
        <button
          className={`challenge-detail-floating-card-participation-button ${isParticipated ? 'disabled' : ''}`}
          type="button"
          disabled={isParticipated}
          onClick={() => {
            // TODO: 참여하기 모달 띄우기
            // TODO: 빈자리 알림받기
          }}
        >
          {/* TODO: api 모집 마감 Dday 추가되면 모집 종료 이후 버튼 텍스트 변경*/}
          {isParticipated ? '참가중인 챌린지에요' : '참여하기'}
        </button>

        {/* TODO: api 모집 마감 Dday 추가되면 모집 종료 이후 미노출 */}
        <div className="challenge-detail-floating-card-due-date-description">
          <span>모집</span>
          {/* TODO: api 모집 마감 Dday 추가되면 반영 */}
          <span>D-4</span>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailFloatingCard;
