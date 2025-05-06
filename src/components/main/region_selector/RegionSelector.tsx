import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';
import { DEFAULT_REGION } from '../../../services/main/models/RegionContextModel';
import { RegionItem } from '../../../api/ApiTypes';
import { RegionContextController } from '../../../services/main/controllers/RegionContextController';

import '../../../styles/main/region_selector/RegionSelector.scss';

const RegionSelector: React.FC = () => {
  const modalRef = useRef<HTMLDivElement>(null);

  const regionController = RegionContextController.getInstance();

  const [preferRegions, setPreferRegions] = useState<RegionItem[]>([]);
  const [selectedRegion, setSelectedRegion] =
    useState<RegionItem>(DEFAULT_REGION);
  const [isRegionSelectorOpen, setIsRegionSelectorOpen] =
    useState<boolean>(false);

  const handleRegionChange = (region: RegionItem) => {
    regionController.setSelectedRegion(region);
    setSelectedRegion(region);
    setIsRegionSelectorOpen(false);
  };

  useEffect(() => {
    const initRegionData = async () => {
      await regionController.getMainData();
      setPreferRegions(regionController.getPreferRegionsList());
      setSelectedRegion(regionController.getSelectedRegion());
    };
    initRegionData();
  }, [regionController]);

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
