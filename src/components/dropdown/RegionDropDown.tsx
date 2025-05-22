import React, { useEffect, useState } from 'react';
import DropDown from './Dropdown';
import { RegionListController } from '../../services/main/controllers/RegionListController';
import useClubRegisterStore from '../../store/club/useClubRegisterStore';
import logger from '../../utils/Logger';
import { getCookie } from '../../utils/Cookie';
import '../../styles/dropdown/CommonDropDown.scss';

const RegionDropDown = ({ className }) => {
  const regionListController = RegionListController.getInstance();

  const [selectedMainRegion, setSelectedMainRegion] = useState<string | null>(
    null,
  );
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(
    null,
  );

  const { setLocation } = useClubRegisterStore();

  useEffect(() => {
    regionListController
      .getRegionList()
      .then(response => {
        const selectedRegionId = Number(getCookie('regionId'));
        if (selectedRegionId) {
          for (const [mainRegion, subRegions] of Object.entries(response)) {
            const selectedSubRegion = subRegions.find(
              region => region.regionId === selectedRegionId,
            );
            if (selectedSubRegion) {
              setSelectedSubRegion(selectedSubRegion.regionName);
              setSelectedMainRegion(mainRegion);
            }
          }
        }
      })
      .catch(err => {
        logger.error(err);
      });
  }, []);

  const handleMainSelect = (regionName: string) => {
    setSelectedMainRegion(regionName);

    const subRegions = regionListController.model.regionList[regionName];
    if (subRegions && subRegions.length > 0) {
      const firstSub = subRegions[0];
      setSelectedSubRegion(firstSub.regionName);
    } else {
      setSelectedSubRegion(null);
    }
  };

  const subList =
    selectedMainRegion &&
    regionListController.model.regionList[selectedMainRegion]
      ? regionListController.model.regionList[selectedMainRegion]
      : [];

  const handleLocation = (regionId: number) => {
    setLocation(regionId);
  };

  return (
    <div className={`dropdown-group-container ${className}`}>
      <div className="dropdown-label-box">
        <span className="dropdown-label">지역</span>
        <span className="dropdown-required">*</span>
      </div>
      <div className="dropdown-box">
        <DropDown
          options={Object.keys(regionListController.model.regionList)}
          defaultItem={selectedMainRegion}
          disabled={false}
          onSelect={handleMainSelect}
        />
        <DropDown
          options={subList.map(item => item.regionName)}
          defaultItem={selectedSubRegion}
          disabled={!selectedMainRegion}
          onSelect={(regionName: string) => {
            setSelectedSubRegion(regionName);
            const matchedRegion = subList.find(
              item => item.regionName === regionName,
            );
            if (matchedRegion) {
              handleLocation(matchedRegion.regionId);
            }
          }}
        />
      </div>
    </div>
  );
};

export default RegionDropDown;
