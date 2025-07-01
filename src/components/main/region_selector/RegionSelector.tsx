import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import { DEFAULT_REGION } from '../../../services/region/models/ModalRegionListModel';
import { RegionItem } from '../../../api/ApiTypes';
import { ModalRegionListController } from '../../../services/region/controllers/ModalRegionListController';
import '../../../styles/main/region_selector/RegionSelector.scss';
import logger from '../../../utils/Logger';

interface RegionSelectorProps {
  accessToken: string | null;
}

const RegionSelector = ({ accessToken }: RegionSelectorProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const modalRegionListController = ModalRegionListController.getInstance();

  const [selectedRegion, setSelectedRegion] =
    useState<RegionItem>(DEFAULT_REGION);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] =
    useState<boolean>(false);

  const handleRegionChange = (region: RegionItem) => {
    modalRegionListController.setSelectedRegion(region);
    setSelectedRegion(region);
    setIsRegionSelectorOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsRegionSelectorOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /* 
    1. 사용자 최초 로그인 후 발급 받는 토큰 과 함께 지역 api 호출 작업 플로우
    2. 1번 이후 지역 api 에서 주는 관심 지역이 있을시에 첫번째 값이 선택
  */
  const fetchModalRegionList = async () => {
    try {
      const response = await modalRegionListController.getModalRegionList();
      setSelectedRegion(response.selectedRegion);
      /* 로그인 했을때만 쿠키값 자동 설정 (비로그인 시에는 지역 모달 에서 선택 시에만 쿠키값 설정) */
      if (accessToken) {
        modalRegionListController.setSelectedRegion(response.selectedRegion);
        modalRegionListController.setInterestRegionList(response.interestRegionList);
      }
    } catch (error) {
      console.error('지역 목록을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    /* 비로그인 시 지역 모달 정보 API 호출 */
    if (!localStorage.getItem('token-storage')) {
      /* 지역 모달 정보를 가져오는 API 호출 */
      fetchModalRegionList();
      logger.log('비로그인 상태 지역 모달 정보 api 호출');
    } else if (accessToken) {
      /* accessToken 이 유효한 경우 => 지역 모달 정보를 가져 오는 API 호출 */
      fetchModalRegionList();
    }
  }, [accessToken]);

  return (
    <div className="region-selector">
      <button
        className="region-selector-btn"
        type="button"
        onClick={() => setIsRegionSelectorOpen(!isRegionSelectorOpen)}
      >
        <div className="icon-container">
          <div className="icon-region" />
          <span>{selectedRegion?.regionName}</span>
        </div>
        <div className="icon-arrow" />
      </button>

      {isRegionSelectorOpen && (
        <RegionSelectorModal
          modalRegionListController={modalRegionListController}
          onClose={() => setIsRegionSelectorOpen(false)}
          modalRef={modalRef}
          selectedRegion={selectedRegion}
          setSelectedRegion={handleRegionChange}
        />
      )}
    </div>
  );
};

export default RegionSelector;
