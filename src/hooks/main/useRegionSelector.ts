import { useState, useEffect } from 'react';
import { RegionContextController } from '../../services/main/controllers/RegionContextController';
import { DEFAULT_REGION } from '../../services/main/models/RegionContextModel';
import { RegionItem } from '../../api/ApiTypes';

export const useRegionSelector = () => {
  const regionController = RegionContextController.getInstance();

  const [preferRegions, setPreferRegions] = useState<RegionItem[]>([]);
  const [selectedRegion, setSelectedRegion] =
    useState<RegionItem>(DEFAULT_REGION);

  const [isLoading, setIsLoading] = useState(true);

  const [isRegionSelectorOpen, setIsRegionSelectorOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const initRegionData = async () => {
      await regionController.initialize();
      setPreferRegions(regionController.getPreferRegionsList());
      setSelectedRegion(regionController.getSelectedRegion());
      setIsLoading(false);
    };
    initRegionData();
  }, [regionController]);

  const handleRegionChange = (region: RegionItem) => {
    regionController.setSelectedRegion(region);
    setSelectedRegion(region);
    setIsRegionSelectorOpen(false);
  };

  return {
    preferRegions,
    selectedRegion,
    isLoading,
    isRegionSelectorOpen,
    setIsRegionSelectorOpen,
    handleRegionChange,
  };
};
