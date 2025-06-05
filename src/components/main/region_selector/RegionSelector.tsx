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

const RegionSelector: React.FC<RegionSelectorProps> = ({ mainDataList, setMainDataList }: RegionSelectorProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const regionContextController = RegionContextController.getInstance();

  const [preferRegions, setPreferRegions] = useState<RegionItem[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<RegionItem>(DEFAULT_REGION);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] = useState<boolean>(false);

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
