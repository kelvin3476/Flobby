import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';

import { DEFAULT_REGION } from '../../../services/main/models/RegionContextModel';
import { useRegionSelector } from '../../../hooks/main/useRegionSelector';

import '../../../styles/main/region_selector/RegionSelector.scss';

const RegionSelector: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const {
    preferRegions,
    selectedRegion,
    isLoading,
    isRegionSelectorOpen,
    setIsRegionSelectorOpen,
    handleRegionChange,
  } = useRegionSelector();

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
          <span>
            {isLoading ? DEFAULT_REGION.regionName : selectedRegion.regionName}
          </span>
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
