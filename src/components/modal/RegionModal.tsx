import React from 'react';

import Header from '@/components/login/Header';
import Button from '@/components/button/Button';

import useRegionForm from '@/hooks/signup/useRegionForm';

import "@/styles/modal/RegionModal.scss"

interface RegionModalProps {
  onClose: () => void;
}

const RegionModal = ({ onClose }: RegionModalProps) => {

  const {
    selectedRegionNames,
    activeCity,
    setActiveCity,
    removeRegion,
    handleSelect,
    cityDistrictMap,
    townRef,
  } = useRegionForm();

  return (
    <>
      {/* 오버레이 */}
      <div className="region-modal-overlay" onClick={onClose}></div>

      {/* 지역 모달 */}
      <div className="region-modal-container">
        <div className="region-title">
          <Header className="Header" headerTitle="관심 지역을 선택해 주세요" />
          <span>관심 지역은 3개까지 선택할 수 있어요.</span>
        </div>

        <main>
          <div className="region-selector">
            {/* 1. 도시 리스트 */}
            <div className="region-city">
              {Object.keys(cityDistrictMap).map(city => (
                <div
                  key={city}
                  className={`region-item ${activeCity === city ? 'active' : ''}`}
                  onClick={() => setActiveCity(city)}
                >
                  <span>{city}</span>
                </div>
              ))}
            </div>

            {/* 2. 구(동) 리스트 - 선택한 도시의 구만 표시 */}
            <div className="region-town" ref={townRef}>
              {activeCity &&
                cityDistrictMap[activeCity]
                  ?.filter(district => !district.regionName.includes('전체'))
                  .map(district => {
                    const regionName = district.regionName;
                    const regionId = district.regionId;
                    const isSelected = selectedRegionNames.includes(
                      `${activeCity} ${regionName}`,
                    );
                    return (
                      <div
                        key={regionId}
                        className={`region-item ${isSelected ? 'selected' : ''}`}
                        onClick={() => handleSelect(activeCity, regionName)}
                      >
                        <span>{regionName}</span>
                      </div>
                    );
                  })}
            </div>

            {/* 3. 선택된 지역 */}
            <div className="region-selected">
              {selectedRegionNames.map(region => (
                <div key={region} className="selected-item">
                  <div>
                    <span>{region}</span>
                    <button onClick={() => removeRegion(region)}></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="buttons">
            <Button className="cancel-btn" title="취소" onClick={onClose} />
            <Button
              className="save-btn"
              title="저장"
              onClick={() => {
                console.log('저장 버튼 클릭 !!');
                onClose()
              }}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default RegionModal;