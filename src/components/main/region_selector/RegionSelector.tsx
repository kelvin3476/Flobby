import React, {useCallback, useEffect, useRef, useState} from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import { DEFAULT_REGION } from '../../../services/region/models/ModalRegionListModel'
import { RegionItem } from '../../../api/ApiTypes';
import { ModalRegionListController } from "../../../services/region/controllers/ModalRegionListController";
import '../../../styles/main/region_selector/RegionSelector.scss';
import { getCookie } from '../../../utils/Cookie';

interface RegionSelectorProps {
  accessToken: string | null;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ accessToken }: RegionSelectorProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const modalRegionListController = ModalRegionListController.getInstance();

  const [preferRegions, setPreferRegions] = useState<RegionItem[]>([]);
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

  const fetchModalRegionList = useCallback(async () => {
    try {
      const response = await modalRegionListController.getModalRegionList();
      console.log('[response]', response);
      if (response.interestRegionList.length > 0) {
        console.log('[1]', 1);
        setSelectedRegion(modalRegionListController.getInterestRegionList()[0])
      } else {
        if (getCookie('regionId') && getCookie('regionName')) {
          console.log('[2]', 2);
          setSelectedRegion({ regionId: Number(getCookie('regionId')), regionName: decodeURIComponent(getCookie('regionName')) });
        } else {
          console.log('[3]', 3);
          setSelectedRegion(response.selectedRegion);
        }
      }
      setPreferRegions(response.interestRegionList);
    } catch (error) {
      console.error('지역 목록을 가져오는 중 오류 발생:', error);
    }
  }, []);

  useEffect(() => {
    /* 비로그인 시 지역 모달 정보 API 호출 */
    if (!localStorage.getItem('token-storage')) {
      /* 지역 모달 정보를 가져오는 API 호출 */
      fetchModalRegionList();
    } else {
      /* 로그인 상태 에서 새로 고침 시 재발급 된 토큰이 유효한 경우 */
      if (accessToken && (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming).type === "reload") {
        /* 지역 모달 정보를 가져오는 API 호출 */
        fetchModalRegionList();
      }
    }
  }, [accessToken, fetchModalRegionList]);

  /* 지역 모달 관심 지역 리스트, 선택 지역, 지역 리스트 데이터 useEffect 호출 */
  useEffect(() => {
    if (accessToken) {
      /* 로그인 상태에서 지역 모달 정보를 가져오는 API 호출 */
      fetchModalRegionList();
    }
  }, []);

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
          preferRegions={preferRegions}
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
