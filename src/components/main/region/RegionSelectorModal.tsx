import React, { useRef, useState } from 'react';

import useFetchRegions from '../../../hooks/main/useFetchRegions';
import useSelectedRegion from '../../../store/main/useSelectedRegion';

import '../../../styles/main/region/RegionSelectorModal.scss';

interface RegionSelectorModalProps {
  preferRegions: string[];
  onClose: () => void;
}
const RegionSelectorModal: React.FC<RegionSelectorModalProps> = ({
  preferRegions,
  onClose,
}) => {
  const { regionList } = useFetchRegions();
  const { selectedRegion, setSelectedRegion } = useSelectedRegion();
  const [activeCity, setActiveCity] = useState<string>('');

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    onClose();
  };

  const handleCityClick = (city: string) => {
    setActiveCity(prev => (prev === city ? null : city));
  };

  return (
    <div className="change-region-container" onClick={e => e.stopPropagation()}>
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
                key={preferRegion}
                className={`prefer-region-btn ${selectedRegion === preferRegion ? 'active' : ''}`}
                onClick={() => handleRegionSelect(preferRegion)}
              >
                {preferRegion}
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
              .map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div className="select-region-city-row">
                    {group.map(city => (
                      <div
                        key={city}
                        className={`select-region-city-item ${activeCity === city ? 'active' : ''}`}
                        onClick={() => handleCityClick(city)}
                      >
                        <span>{city}</span>
                      </div>
                    ))}
                  </div>

                  {activeCity && group.includes(activeCity) && (
                    <div className="select-region-town">
                      {regionList[activeCity].map(district => (
                        <div
                          key={district}
                          className="select-region-town-item"
                          onClick={() => handleRegionSelect(district)}
                        >
                          {district}
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
