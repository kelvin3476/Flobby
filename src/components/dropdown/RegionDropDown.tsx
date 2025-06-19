import React, { useEffect, useState } from 'react';
import DropDown from './Dropdown';
import { RegionListController } from '../../services/region/controllers/RegionListController';
import useClubRegisterStore from '../../store/club/useClubRegisterStore';
import logger from '../../utils/Logger';
import { getCookie } from '../../utils/Cookie';
import Label from '../club/register/Label';
import '../../styles/dropdown/CommonDropDown.scss';

interface RegionDropDownProps {
  className?: string;
  prevRegion?: string;
}

const RegionDropDown = ({ className, prevRegion }: RegionDropDownProps) => {
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
              /* 하위 지역이 전체인 경우 > 하위 지역의 앞글자 와 상위 지역과 같은 경우 > 해당 상위 지역 으로 저장 */
              if (selectedSubRegion.regionName.split(' ')[0] === mainRegion) {
                setSelectedMainRegion(mainRegion);
              } else {
                /* 하위 지역이 전체가 아닌 경우 > 하위 지역 및 상위 지역 그대로 저장 */
                setSelectedSubRegion(selectedSubRegion.regionName);
                setSelectedMainRegion(mainRegion);
              }
            }
          }
        }
      })
      .catch(err => {
        logger.error(err);
      });
  }, []);

  // 수정페이지 호출 로직
  useEffect(() => {
    regionListController
      .getRegionList()
      .then(response => {
        const selectedRegionName = prevRegion;
        if (selectedRegionName) {
          for (const [mainRegion, subRegions] of Object.entries(response)) {
            const selectedSubRegion = subRegions.find(
              region => region.regionName === prevRegion,
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
  }, [prevRegion]);

  const handleMainSelect = (regionName: string) => {
    setSelectedMainRegion(regionName);

    const subRegions = regionListController.model.regionList[regionName].filter(subRegion => !subRegion.regionName.includes("전체"));
    if (subRegions && subRegions.length > 0) {
      const firstSub = subRegions[0];
      setSelectedSubRegion(firstSub.regionName);
    } else {
      setSelectedSubRegion(null);
    }
  };

  const subList =
    selectedMainRegion &&
    regionListController.model.regionList[selectedMainRegion].filter(subRegion => !subRegion.regionName.includes("전체"))
      ? regionListController.model.regionList[selectedMainRegion].filter(subRegion => !subRegion.regionName.includes("전체"))
      : [];

  const handleLocation = (regionId: number) => {
    setLocation(regionId);
  };

  return (
    <div className={`dropdown-group-container ${className}`}>
      <Label labelTitle="지역" isRequired />
      <div className="dropdown-box">
        <DropDown
          options={Object.keys(regionListController.model.regionList)}
          placeholder="상위 지역"
          defaultItem={selectedSubRegion === null ? null : selectedMainRegion} /* 하위 지역이 null 인 경우 (00 전체) > 상위 지역 null 처리 및 아닌 경우엔 자동 선택된 상위 지역 노출 */
          disabled={false}
          onSelect={handleMainSelect}
        />
        <DropDown
          options={subList.map(item => item.regionName)}
          placeholder="하위 지역"
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
