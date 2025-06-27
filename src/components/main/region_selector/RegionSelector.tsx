import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import { DEFAULT_REGION } from '../../../services/region/models/ModalRegionListModel';
import { RegionItem } from '../../../api/ApiTypes';
import { ModalRegionListController } from '../../../services/region/controllers/ModalRegionListController';
import '../../../styles/main/region_selector/RegionSelector.scss';
import { getCookie } from '../../../utils/Cookie';

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

  /* TODO: 1. 사용자 최초 로그인 후 발급 받는 토큰 과 함께 지역 api 호출 작업 플로우 구성 필요
           2. 1번 이후 지역 api 에서 주는 관심 지역이 있을시에 첫번째 값이 선택되게끔 작업 필요
  */
  const fetchModalRegionList = async () => {
    try {
      const response = await modalRegionListController.getModalRegionList();
      /* 선택한 지역 과 쿠키에 저장된 지역 아이디 값이 같은 경우 */
      if (
        modalRegionListController.getSelectedRegion().regionId ===
        Number(getCookie('regionId'))
      ) {
        setSelectedRegion(modalRegionListController.getSelectedRegion());
        modalRegionListController.setSelectedRegion(
          modalRegionListController.getSelectedRegion(),
        );
        return;
      }

      /* 그 외 케이스 */
      setSelectedRegion(response.selectedRegion);
      modalRegionListController.setSelectedRegion(response.selectedRegion);
      modalRegionListController.setInterestRegionList(
        response.interestRegionList,
      );
    } catch (error) {
      console.error('지역 목록을 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    /* 비로그인 시 지역 모달 정보 API 호출 */
    if (!localStorage.getItem('token-storage')) {
      /* 지역 모달 정보를 가져오는 API 호출 */
      fetchModalRegionList();
    } else {
      /* 로그인 상태 에서 새로 고침 시 재발급 된 토큰이 유효한 경우 */
      if (
        accessToken &&
        (
          performance.getEntriesByType(
            'navigation',
          )[0] as PerformanceNavigationTiming
        ).type === 'reload'
      ) {
        /* 지역 모달 정보를 가져오는 API 호출 */
        fetchModalRegionList();
      }
    }
  }, [accessToken, selectedRegion]);

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
