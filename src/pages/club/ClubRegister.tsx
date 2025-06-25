import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import MainHeader from '../../components/header/MainHeader';
import ImageUploader from '../../components/club/register/ImageUploader';
import RegionDropDown from '../../components/dropdown/RegionDropDown';
import CategoryDropDown from '../../components/dropdown/CategoryDropDown';
import MaxMember from '../../components/club/register/MaxMember';
import ClubDescription from '../../components/club/register/ClubDescription';

import Button from '../../components/button/Button';
import Title from '../../components/club/text/Title';
import RequiredText from '../../components/club/text/RequiredText';
import ClubModal from '../../components/modal/ClubModal';

import useMainPage from '../../hooks/main/useMainPage';
import useClubRegisterStore from '../../store/club/useClubRegisterStore';

import logger from '../../utils/Logger';

import { ClubController } from '../../services/club/controllers/ClubController';

import '../../styles/club/register/ClubRegister.scss';
import { ClubItemDetail } from '../../api/ApiTypes';

const ClubRegister = () => {
  const {
    clubName,
    setClubName,
    description,
    setDescription,
    location,
    maxMembers,
    setMaxMembers,
    file,
    setIsImageFileValid,
    setImageFileError,
    mainCategory,
    subCategory,
    setSubCategory,
    setIsCategoryValid,
    setCategoryError,
    setIsTitleValid,
    setIsDescValid,
    setIsMaxValid,
    setTitleError,
    setDescError,
    setDescCount,
    setMaxError,
  } = useClubRegisterStore();
  const navigate = useNavigate();
  const loc = useLocation();
  const clubId = loc.state;

  const [modalStep, setModalStep] = useState<null | 'confirm' | 'complete'>(
    null,
  );
  const [clubItemData, setClubItemData] = useState<ClubItemDetail | null>(null);

  const { accessToken, mainDataList, setMainDataList } = useMainPage();

  const clubController = ClubController.getInstance();

  const handleValidChange = () => {
    let isError = false;

    // 이미지 유효성 검사
    if (!file) {
      setIsImageFileValid(false);
      setImageFileError('이미지를 등록해 주세요.');
      isError = true;
    } else {
      setIsImageFileValid(true);
      setImageFileError('');
    }

    // 카테고리 유효성 검사
    if (!mainCategory || !subCategory) {
      setIsCategoryValid(false);
      setCategoryError('카테고리를 선택해 주세요.');
      isError = true;
    } else {
      setIsCategoryValid(true);
      setCategoryError('');
    }

    // 모임제목 유효성 검사
    if (clubName.trim() === '') {
      setIsTitleValid(false);
      setTitleError('모임 제목을 입력해 주세요.');
      isError = true;
    } else {
      setIsTitleValid(true);
      setTitleError('');
    }

    // 모임내용 유효성 검사
    if (description.trim() === '') {
      setIsDescValid(false);
      setDescError('소개글을 입력해 주세요.');
      isError = true;
    } else {
      setIsDescValid(true);
      setDescError('');
    }

    // 모임규모 유효성 검사
    if (!maxMembers) {
      setIsMaxValid(false);
      setMaxError('인원 수를 입력해 주세요.');
      isError = true;
    } else {
      setIsMaxValid(true);
      setMaxError('');
    }

    if (isError) return;

    setModalStep('confirm');
  };

  const handleSubmitClubRegistrationForm = async () => {
    if (file) {
      const formData = new FormData();
      logger.log('file', file);

      const jsonData = {
        clubName: clubName,
        description: description,
        mainCategory: mainCategory,
        subCategory: subCategory,
        location: location,
        maxMembers: maxMembers,
      };

      formData.append('file', file);
      formData.append(
        'data',
        new Blob([JSON.stringify(jsonData)], { type: 'application/json' }),
      );

      try {
        await clubController.createClub(formData);
      } catch (error) {
        console.error('모임 등록 요청 실패', error);
      }
    }
  };

  const handleEditClubRegistrationForm = async () => {
    const formData = new FormData();

    // 이미지가 있는 경우에만 추가
    if (file) {
      logger.log('file', file);
      formData.append('file', file);
    }

    const jsonData = {
      clubName: clubName,
      description: description,
      mainCategory: mainCategory,
      subCategory: subCategory,
      location: location,
      maxMembers: maxMembers,
    };

    formData.append(
      'data',
      new Blob([JSON.stringify(jsonData)], { type: 'application/json' }),
    );

    try {
      await clubController.editClub(Number(clubId), formData);
    } catch (error) {
      console.error('모임 수정 요청 실패', error);
    }
  };

  /* 모임 수정 페이지 로직 */
  const isEditPage = window.location.pathname.startsWith('/club/edit');

  useEffect(() => {
    if (isEditPage) {
      try {
        const fetchClubItemData = async () => {
          const data = await clubController.selectClubDetail(Number(clubId));
          setClubItemData(data);

          /* 모임 수정 일때 기존 입력한 데이터 다시 불러와서 상태값 저장 */
          setClubName(data.clubDTO.clubName);
          setDescription(data.clubDTO.description);
          setMaxMembers(data.clubDTO.maxMembers);
          setSubCategory(data.clubDTO.subCategory);

          setDescCount(data.clubDTO.description.length);
          setIsTitleValid(true);
          setIsDescValid(true);
          setIsCategoryValid(true);
          setIsMaxValid(true);
          setIsImageFileValid(true);
        };

        fetchClubItemData();
      } catch (error) {
        logger.error('clubRegister', error);
      }
    }
  }, [clubId, isEditPage]);

  /* 모임 등록 페이지 최초 진입시 상태 초기화 */
  useEffect(() => {
    /* 모임 수정 페이지가 아닐 때만 (모임 등록 페이지 일때 상태 초기화) */
    if (!isEditPage) {
      setClubName('');
      setDescription('');
      setIsTitleValid(true);
      setIsDescValid(true);
      setTitleError('');
      setDescError('');
      setDescCount(0);
      setIsCategoryValid(true);
      setCategoryError('');
      setMaxMembers(0);
      setIsMaxValid(true);
      setMaxError('');
      setIsImageFileValid(true);
      setImageFileError('');
    }
  }, []);

  return (
    <div className="register-container">
      <MainHeader
        accessToken={accessToken}
        mainDataList={mainDataList}
        setMainDataList={setMainDataList}
      />
      <div className="register-main">
        <div className="register-title">
          {isEditPage ? (
            <Title titleName="모임 수정" />
          ) : (
            <Title titleName="모임 등록" />
          )}
          <RequiredText />
        </div>

        <div className="register-content">
          <div className="register-up">
            <ImageUploader
              prevImage={isEditPage ? clubItemData?.clubDTO.clubImage : null}
            />
            <div className="up-and-right">
              <RegionDropDown
                className="register-region"
                prevRegion={isEditPage ? clubItemData?.clubDTO.location : null}
              />
              <CategoryDropDown
                className="register-category"
                isEditPage={isEditPage}
              />
              <MaxMember className="register-member" />
            </div>
          </div>
          <ClubDescription className="register-club" />

          {/* 버튼 부분 */}
          <div className="buttons">
            <div className="left-wrapper">
              {isEditPage && (
                <Button
                  className="delete-btn"
                  title="삭제"
                  onClick={() => {
                    // TODO: 삭제 api 호출
                  }}
                />
              )}
            </div>
            <div className="right-wrapper">
              <Button
                className="cancel-btn"
                title="취소"
                onClick={() =>
                  isEditPage
                    ? navigate(`/club/${clubId}`)
                    : window.history.back()
                }
              />
              <Button
                className="allow-btn"
                title="등록"
                onClick={handleValidChange}
              />
            </div>
          </div>
        </div>
      </div>
      <footer>{/* 추후 footer 추가 */}</footer>

      {modalStep && (
        <ClubModal
          mainMessage={
            modalStep === 'confirm'
              ? '등록 하시겠습니까?'
              : '정상적으로 처리되었습니다.'
          }
          showIcon={modalStep === 'confirm'}
          iconType="check"
          showCancelButton={modalStep === 'confirm'}
          onConfirm={async () => {
            if (modalStep === 'confirm') {
              setModalStep('complete');
            } else {
              setModalStep(null);
              isEditPage
                ? handleEditClubRegistrationForm()
                : handleSubmitClubRegistrationForm();
              navigate('/club/list');
            }
          }}
          onCancel={() => setModalStep(null)}
        />
      )}
    </div>
  );
};

export default ClubRegister;
