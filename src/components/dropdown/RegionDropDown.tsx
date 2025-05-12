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

  const [mainList, setMainList] = useState<string[]>([]);
  const [selectedMainRegion, setSelectedMainRegion] = useState<string | null>(
    null,
  );
  const { setLocation } = useClubCreateStore();

  useEffect(() => {
    const fetchRegionListData = async () => {
      await regionListController.getRegionList();
      const regionList = regionListController.model.regionList;
      setMainList(Object.keys(regionList));

      const initialGroup = getInitialGroup(regionList);
      if (initialGroup) {
        setSelectedMainRegion(initialGroup);
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
    <div className="dropdown_group_container">
      <div className="dropdown_label_box">
        <span className="dropdown_label">지역 선택</span>
        <span className="dropdown_required">*</span>
      </div>
      <div className="dropdown_box">
        <DropDown
          options={mainList}
          defaultItem={selectedMainRegion}
          disabled={false}
          onSelect={handleMainSelect}
        />
        <DropDown
          options={subList.map(item => item.regionName)}
          defaultItem={regionContextController.model.selectedRegion?.regionName}
          disabled={!selectedMainRegion}
          onSelect={(regionName: string) => {
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
