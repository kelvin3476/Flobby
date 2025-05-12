import React, { useEffect, useState } from 'react';
import DropDown from './Dropdown';
import { RegionListController } from '../../services/main/controllers/RegionListController';
import { RegionContextController } from '../../services/main/controllers/RegionContextController';
import { RegionItem } from '../../api/ApiTypes';
import useClubCreateStore from '../../store/club/useClubCreateStore';
import '../../styles/dropdown/CommonDropDown.scss';

const RegionDropDown = () => {
  const regionListController = RegionListController.getInstance();
  const regionContextController = RegionContextController.getInstance();

  const [selectedMainRegion, setSelectedMainRegion] = useState<string | null>(
    null,
  );
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(
    null,
  );

  const { setLocation } = useClubCreateStore();

  useEffect(() => {
    const fetchRegionListData = async () => {
      await regionListController.getRegionList();

      const initialGroup = getInitialGroup(
        regionListController.model.regionList,
      );

      if (initialGroup) {
        setSelectedMainRegion(initialGroup);
        const subRegions = regionListController.model.regionList[initialGroup];

        // 기획 디폴트값 or 새로 선택된 상위 지역 기반으로 첫번째 데이터 렌더링 되도록 수정
        if (subRegions && subRegions.length > 0) {
          const defaultSubRegion =
            regionContextController.model.selectedRegion &&
            subRegions.some(
              region =>
                region.regionName ===
                regionContextController.model.selectedRegion.regionName,
            )
              ? regionContextController.model.selectedRegion.regionName
              : subRegions[0].regionName;

          setSelectedSubRegion(defaultSubRegion);
        }
      }
    };

    fetchRegionListData();
  }, []);

  const getInitialGroup = (
    regionList: Record<string, RegionItem[]>,
  ): string | null => {
    const selectedRegion = regionContextController.model.selectedRegion;
    if (!selectedRegion) return null;

    for (const [group, regions] of Object.entries(regionList)) {
      if (
        regions.some(region => region.regionName === selectedRegion.regionName)
      ) {
        return group;
      }
    }
    return null;
  };

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
    <div className="dropdown-group-container">
      <div className="dropdown-label-box">
        <span className="dropdown-label">지역 선택</span>
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
