import React from 'react';
import { useNavigate } from 'react-router-dom';

import MainHeader from '@/components/header/MainHeader';
import Title from '@/components/club/text/Title';
import TextButton from '@/components/button/TextButton';
import Button from '@/components/button/Button';
import Tag from '@/components/tag/Tag';

import LoadingSpinnerController from '@/components/controllers/LoadingSpinnerController';

import RegionModal from '@/components/modal/RegionModal';
import CategoryModal from '@/components/modal/CategoryModal';
import ClubModal from '@/components/modal/ClubModal';

import useMainPage from '@/hooks/main/useMainPage';
import useNicknameForm from '@/hooks/signup/nickname/useNicknameForm';

import logger from '@/utils/Logger';
import { ImageExtensionConverter } from '@/utils/ImageExtensionConverter';

import { GetProfileDetailResponse } from '@/api/ApiTypes';
import { MyInfoController } from '@/services/mypage/controllers/MyInfoControllers';

import defaultProfileIcon from '../../../public/img/mypage/icon_profile.png'
import "@/styles/mypage/ProfileManagement.scss"

const ProfileManagement = () => {
  const navigate = useNavigate();

  const { accessToken } = useMainPage()

  const {
    nickname,
    setNickname,
    isNicknameValid,
    nicknameError,
    handleNicknameChange,
  } = useNicknameForm()

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const [file, setFile] = React.useState<File | null>(null)
  const [profileIcon, setProfileIcon] = React.useState<string>(defaultProfileIcon)
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [modalStep, setModalStep] = React.useState<string | null>(null)

  const [isOpenRegionModal, setIsOpenRegionModal] = React.useState(false);
  const [isOpenCategoryModal, setIsOpenCategoryModal] = React.useState(false);
  const [isOpenProfileModal, setIsOpenProfileModal] = React.useState(false);

  const [profileInfoData, setProfileInfoData] = React.useState<GetProfileDetailResponse | null>(null)

  const profileInfoController = MyInfoController.getInstance();

  const fetchProfileInfo = async () => {
    const profileInfo = await profileInfoController.getProfileDetail()
    setProfileInfoData(profileInfo);
    setProfileIcon(profileInfo.profileImageUrl || defaultProfileIcon);
    setNickname(profileInfo.nickName || '');

    // ⭐ 닉네임 유효성 검사 강제 실행
    handleNicknameChange({ target: { value: profileInfo.nickName || '' } } as React.ChangeEvent<HTMLInputElement>);
  }

  React.useEffect(() => {
    fetchProfileInfo();
  }, []);

  // 파일 처리 함수
  const handleFile = async (file: File) => {
    setIsLoading(true);
    try {
      let url: string;

      if (file.type === 'image/heic' || file.type === 'image/heif') {
        const result = await ImageExtensionConverter(file);
        url = URL.createObjectURL(result);
      } else {
        url = URL.createObjectURL(file);
      }

      setProfileIcon(prevUrl => {
        logger.log('ImageUploader', 'imageURL', prevUrl);
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
        }
        return url;
      });

      setFile(file);
      logger.log('ImageUploader', 'imageFile', file);
    } finally {
      setIsLoading(false);
    }
  };

  // 파일 변경 이벤트 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  // 프로필 정보 수정 핸들러
  const editProfileInfoHandler = async () => {
    const formData = new FormData();

    logger.log('defaultImage', profileIcon === defaultProfileIcon)
    logger.log('nickname', nickname)
    logger.log('interestRegion', JSON.parse(localStorage.getItem('region-storage'))?.state?.selectedRegionIds)
    logger.log('interestCategory', JSON.parse(localStorage.getItem('hobby-storage'))?.state?.selectedHobbies)

    const jsonData = {
      defaultImage: profileIcon === defaultProfileIcon,
      nickName: nickname,
      interestRegion: JSON.parse(localStorage.getItem('region-storage'))?.state?.selectedRegionIds,
      interestCategory: JSON.parse(localStorage.getItem('hobby-storage'))?.state?.selectedHobbies,
    }

    logger.log('file', file);
    if (file) {
      formData.append('file', file)
    }

    formData.append('data', new Blob([JSON.stringify(jsonData)], { type: 'application/json' }));

    try {
      await profileInfoController.editProfileDetail(formData)
    } catch (error) {
      console.error('프로필 정보 수정 실패', error);
    }
  }

  return (
    <>
      <div className="profile-management-wrapper">
        {/* 메인 헤더 */}
        <MainHeader accessToken={accessToken} />

        <div className="profile-content-container">
          {/* 프로필 설정 타이틀 헤더 */}
          <Title titleName="프로필 관리" />
          <div className="profile-info-container">
            <div className="profile-info-table-container">
              {/* 프로필 이미지 설정 테이블 */}
              <div className="profile-info-table-profile-image-container">
                <div className="profile-info-table-profile-image-title">
                  프로필 이미지
                </div>
                <div className="profile-info-table-profile-image-content-container">
                  <div className="profile-info-table-profile-image-content-sub-container">
                    <img src={profileIcon} alt="" />
                    {isLoading && (
                      <div className="overlay">
                        <LoadingSpinnerController />
                      </div>
                    )}

                    <div className="profile-info-table-profile-image-content-btn-container">
                      <Button
                        className="profile-info-table-profile-image-change-btn"
                        title="이미지 변경"
                        onClick={() => fileInputRef.current?.click()}
                      />
                      <Button
                        className="profile-info-table-default-profile-image-change-btn"
                        title="기본 이미지로 변경"
                        onClick={() => setProfileIcon(defaultProfileIcon)}
                      />

                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/png, image/jpeg, image/jpg, image/heic, image/heif"
                        className="image-uploader-file-input"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 닉네임 설정 테이블 */}
              <div className="profile-info-table-nickname-container">
                <div className="profile-info-table-nickname-title">닉네임</div>
                <div className="profile-info-table-nickname-content-container">
                  <div className="profile-info-table-nickname-content-sub-container">
                    <input
                      id="profile-info-nickname"
                      type="text"
                      placeholder="예시 닉네임"
                      value={nickname}
                      onChange={handleNicknameChange}
                    />
                    {nicknameError && (
                      <p className={nicknameError[0]}>{nicknameError[1]}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="profile-info-table-email-container">
                <div className="profile-info-table-email-title">이메일</div>
                <div className="profile-info-table-email-content-container">
                  <span>{profileInfoData?.email ?? 'email@naver.com'}</span>
                </div>
              </div>

              {/* 관심 지역 설정 테이블 */}
              <div className="profile-info-table-region-container">
                <div className="profile-info-table-region-title">관심 지역</div>
                <div
                  className={`profile-info-table-region-content-container ${profileInfoData?.interestRegions.length > 0 ? '' : 'empty'}`}
                >
                  <div className="profile-info-table-region-tag-container">
                    {profileInfoData?.interestRegions.length > 0 &&
                      profileInfoData?.interestRegions.map(region => {
                        return (
                          <Tag
                            key={region.regionId}
                            label={region.regionName}
                            type="profile"
                            color="purple"
                            size="default"
                          />
                        );
                      })}
                  </div>
                  <Button
                    className="profile-info-table-region-btn"
                    title="관심 지역 설정"
                    onClick={() => setIsOpenRegionModal(true)}
                  />
                </div>
              </div>

              {/* 관심 카테고리 설정 테이블 */}
              <div className="profile-info-table-category-container">
                <div className="profile-info-table-category-title">
                  관심 카테고리
                </div>
                <div
                  className={`profile-info-table-category-content-container ${profileInfoData?.interestCategorys.length > 0 ? '' : 'empty'}`}
                >
                  <div className="profile-info-table-category-tag-container">
                    {profileInfoData?.interestCategorys.length > 0 &&
                      profileInfoData?.interestCategorys.map(category => {
                        return (
                          <Tag
                            key={category}
                            label={category}
                            type="profile"
                            color="purple"
                            size="default"
                          />
                        );
                      })}
                  </div>
                  <Button
                    className="profile-info-table-category-btn"
                    title="관심 카테고리 설정"
                    onClick={() => setIsOpenCategoryModal(true)}
                  />
                </div>
              </div>
            </div>

            {/* 프로필 설정 버튼 컨테이너 */}
            <div className="profile-info-btn-wrapper">
              <div className="profile-info-btn-container">
                <Button
                  className="profile-info-cancel-btn"
                  title="취소"
                  onClick={() => navigate('/mypage')}
                />
                <Button
                  className={`profile-info-save-btn ${!isNicknameValid ? 'disabled' : ''}`}
                  title="저장"
                  disabled={!isNicknameValid}
                  onClick={() => {
                    setIsOpenProfileModal(true);
                    setModalStep('confirm');
                  }}
                />
              </div>
              {/* TODO: 마이페이지 2 때 회원 탈퇴 api 추가 후 연동 예정 */}
              <TextButton
                className="gray"
                buttonName="Flobby 회원 탈퇴"
                onClick={() => console.log('Flobby 회원 탈퇴 버튼 클릭 !!')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 지역 모달 */}
      {isOpenRegionModal && (
        <RegionModal onClose={() => setIsOpenRegionModal(false)} />
      )}

      {/* 카테고리 모달 */}
      {isOpenCategoryModal && (
        <CategoryModal onClose={() => setIsOpenCategoryModal(false)} />
      )}

      {/* 프로필 정보 저장 모달 */}
      {isOpenProfileModal && (
        <ClubModal
          mainMessage={
            modalStep === 'confirm'
              ? '프로필 정보를 저장할까요?'
              : '프로필 정보를 저장했어요'
          }
          showIcon={modalStep === 'confirm'}
          iconType="check"
          showCancelButton={modalStep === 'confirm'}
          onCancel={() => setIsOpenProfileModal(false)}
          onConfirm={async () => {
            if (modalStep === 'confirm') {
              setModalStep('complete');
            } else {
              await editProfileInfoHandler();
              setModalStep(null);
              setIsOpenProfileModal(false);
            }
          }}
        />
      )}
    </>
  );
};

export default ProfileManagement;