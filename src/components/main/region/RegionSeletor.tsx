import React, { useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import useSelectedRegion from '../../../store/main/useSelectedRegion';

import '../../../styles/main/region/RegionSelector.scss';

const selectedRegions = ['송파구', '구로구', '용산구']; // test data

const RegionSeletor: React.FC = () => {
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] =
    useState<boolean>(false);
  const { selectedRegion, setSelectedRegion } = useSelectedRegion();

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
        />
      )}
    </div>
  );
};

export default RegionSeletor;
