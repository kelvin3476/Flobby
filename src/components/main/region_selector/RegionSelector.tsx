import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import useSelectedRegionStore from '../../../store/main/useSelectedRegionStore';

import '../../../styles/main/region_selector/RegionSelector.scss';

// 관심 지역 test용 초기값

const preferRegions = [
  { regionName: '송파구', regionId: 195 },
  { regionName: '구로구', regionId: 203 },
  { regionName: '용산구', regionId: 216 },
];

// const preferRegions = [];

// const preferRegions = null;

const RegionSelector: React.FC = () => {
  const { selectedRegion, setSelectedRegion } = useSelectedRegionStore();

  const [isRegionSelectorOpen, setIsRegionSelectorOpen] =
    useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!preferRegions || preferRegions?.length === 0) {
      setSelectedRegion({ regionName: '서울전체', regionId: 288 });
    }
  }, [preferRegions]);

  return (
    <div className="region-selector">
      <button
        className="region-selector-btn"
        type="button"
        onClick={() => setIsRegionSelectorOpen(!isRegionSelectorOpen)}
      >
        <div className="icon-container">
          <div className="icon-region" />
          <span>{selectedRegion.regionName}</span>
        </div>
        <div className="icon-arrow" />
      </button>

      {isRegionSelectorOpen && (
        <RegionSelectorModal
          preferRegions={preferRegions}
          onClose={() => setIsRegionSelectorOpen(false)}
          modalRef={modalRef}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      )}
    </div>
  );
};

export default RegionSelector;
