import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import { DEFAULT_REGION } from '../../../services/region/models/RegionContextModel';
import { RegionItem, MainData } from '../../../api/ApiTypes';
import { RegionContextController } from '../../../services/region/controllers/RegionContextController';

import '../../../styles/main/region_selector/RegionSelector.scss';

interface RegionSelectorProps {
  mainDataList: MainData;
  setMainDataList: React.Dispatch<React.SetStateAction<MainData>>;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  mainDataList,
  setMainDataList,
}: RegionSelectorProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const regionContextController = RegionContextController.getInstance();

  const [preferRegions, setPreferRegions] = useState<RegionItem[]>([]);
  const [selectedRegion, setSelectedRegion] =
    useState<RegionItem>(DEFAULT_REGION);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] =
    useState<boolean>(false);

  const handleRegionChange = (region: RegionItem) => {
    regionContextController.setSelectedRegion(region);
    setSelectedRegion(region);
    setIsRegionSelectorOpen(false);
  };

  useEffect(() => {
    // 초기 메인 데이터 저장 및 새로 고침 시 업데이트
    setMainDataList(mainDataList);
    // 관심 지역 저장
    setPreferRegions(regionContextController.getPreferRegionsList());
    // 선택 지역 저장
    setSelectedRegion(regionContextController.getSelectedRegion());
  }, [mainDataList]);

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

  // 새로고침시 선택지역 초기화 코드
  // TODO: 관심지역 초기화 코드도 필요(로그인 유지 구현되면)
  useEffect(() => {
    const controller = RegionContextController.getInstance();

    const selectedRegion = controller.getSelectedRegion();

    // 만약 디폴트 값과 같다면 쿠키값으로 상태 업데이트(쿠키값이 디폴트 값이어도 상관없으므로)
    if (selectedRegion.regionId === DEFAULT_REGION.regionId) {
      controller.model.initFromCashingData();
    }

    const preferRegionList = localStorage.getItem('preferRegionsList');
    if (preferRegionList) {
      controller.setPreferRegionsList(JSON.parse(preferRegionList));
    }

    setSelectedRegion(controller.getSelectedRegion());
    setPreferRegions(controller.getPreferRegionsList());
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
