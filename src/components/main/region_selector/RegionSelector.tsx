import React, { useEffect, useRef, useState } from 'react';
import RegionSelectorModal from './RegionSelectorModal';

import '../../../styles/main/region_selector/RegionSelector.scss';
import { RegionContextController } from '../../../services/main/controllers/RegionContextController';
import { RegionItem } from '../../../api/ApiTypes';
import { DEFAULT_REGION } from '../../../services/main/models/RegionContextModel';

const RegionSelector: React.FC = () => {
  const regionController = RegionContextController.getInstance();

  const [preferRegions, setPreferRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(DEFAULT_REGION);

  const [isLoading, setIsLoading] = useState(true);

  const [isRegionSelectorOpen, setIsRegionSelectorOpen] =
    useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initRegionData = async () => {
      await regionController.initialize();
      setPreferRegions(regionController.getPreferRegionsList());
      setSelectedRegion(regionController.getSelectedRegion());
      setIsLoading(false);
    };
    initRegionData();
  }, []);

  const handleRegionChange = (region: RegionItem) => {
    regionController.setSelectedRegion(region);
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
