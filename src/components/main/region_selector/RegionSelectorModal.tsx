import React, { RefObject, useState } from 'react';
import useFetchRegions from '../../../hooks/main/useFetchRegions';
import { RegionItem } from '../../../store/main/useRegionListStore';

import '../../../styles/main/region_selector/RegionSelectorModal.scss';

interface RegionSelectorModalProps {
  preferRegions: RegionItem[];
  onClose: () => void;
  modalRef: RefObject<HTMLDivElement>;
  selectedRegion: RegionItem;
  setSelectedRegion: (region: RegionItem) => void;
}

const RegionSelectorModal: React.FC<RegionSelectorModalProps> = ({
  preferRegions,
  onClose,
  modalRef,
  selectedRegion,
  setSelectedRegion,
}) => {
  const { regionList } = useFetchRegions();
  const [activeCity, setActiveCity] = useState<string>('');

  const handleRegionSelect = (region: RegionItem) => {
    setSelectedRegion(region);
    onClose();
  };

  return (
    <div
      className="change-region-container"
      onClick={e => e.stopPropagation()}
      ref={modalRef}
    >
      {/* header */}
      <div className="change-region-header">
        <h1>지역 변경</h1>
        <div className="icon-close" onClick={onClose} />
      </div>

      {/* 관심 지역 */}
      <div className="prefer-region-container">
        <div className="prefer-region-title">
          <div className="icon-prefer" />
          <span>관심 지역</span>
          <p>관심 지역은 마이페이지에서 변경할 수 있어요.</p>
        </div>
        <div className="prefer-region-content">
          {preferRegions.map(preferRegion => {
            return (
              <div
                key={preferRegion.regionId}
                className={`prefer-region-btn ${selectedRegion.regionName === preferRegion.regionName ? 'active' : ''}`}
                onClick={() => handleRegionSelect(preferRegion)}
              >
                {preferRegion.regionName}
              </div>
            );
          })}
        </div>
      </div>

      {/* 지역 선택 */}
      <div className="select-region-container">
        <div className="select-region-title">
          <div className="icon-region" />
          <span>지역 선택</span>
          <p>지역은 최대 1개까지 선택할 수 있어요.</p>
        </div>
        <div className="select-region-content">
          <div className="select-region-city">
            {Object.keys(regionList)
              .reduce((rows, city, index) => {
                if (index % 4 === 0) rows.push([]);
                rows[rows.length - 1].push(city);
                return rows;
              }, [])
              .map((citiesInRow, citiesInRowIndex) => (
                <div key={citiesInRowIndex}>
                  <div className="select-region-city-row">
                    {citiesInRow.map(city => (
                      <div
                        key={city}
                        className={`select-region-city-item ${activeCity === city ? 'active' : ''}`}
                        onClick={() =>
                          setActiveCity(prev => (prev === city ? null : city))
                        }
                      >
                        <span>{city}</span>
                      </div>
                    ))}
                  </div>

                  {activeCity && citiesInRow.includes(activeCity) && (
                    <div className="select-region-town">
                      {regionList[activeCity].map(district => (
                        <div
                          key={district.regionId}
                          className="select-region-town-item"
                          onClick={() => handleRegionSelect(district)}
                        >
                          {district.regionName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionSelectorModal;
