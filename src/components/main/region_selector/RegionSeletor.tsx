import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import useSelectedRegion from '../../../store/main/useSelectedRegion';

import '../../../styles/main/region_selector/RegionSelector.scss';

const selectedRegions = ['송파구', '구로구', '용산구']; // test data

const RegionSeletor: React.FC = () => {
  const { selectedRegion, setSelectedRegion } = useSelectedRegion();

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

  return (
    <div className="region-selector">
      <button
        className="region-selector-btn"
        type="button"
        onClick={() => setIsRegionSelectorOpen(!isRegionSelectorOpen)}
      >
        <div className="icon-region" />
        <span>{selectedRegion}</span>
        <div className="icon-arrow" />
      </button>

      {isRegionSelectorOpen && (
        <RegionSelectorModal
          preferRegions={selectedRegions}
          onClose={() => setIsRegionSelectorOpen(false)}
          modalRef={modalRef}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
        />
      )}
    </div>
  );
};

export default RegionSeletor;
