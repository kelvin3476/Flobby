import React, { RefObject, useEffect, useState } from 'react';
import { RegionItem } from '../../../api/ApiTypes';
import { ModalRegionListController } from '../../../services/region/controllers/ModalRegionListController';
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
  const [activeCity, setActiveCity] = useState<string>('');
  const [activeTown, setActiveTown] = useState<RegionItem | null>(null);

  const modalRegionListController = ModalRegionListController.getInstance();

  const handleSelectRegion = async (region: RegionItem) => {
    setSelectedRegion(region);
    setActiveTown(region);
    onClose();
  };

  useEffect(() => {
    const fetchRegionListData = async () => {
      await modalRegionListController.getModalRegionList();

      if (modalRegionListController.model.modalRegionList.regionList && selectedRegion.regionId) {
        const cityEntry = Object.entries(
            modalRegionListController.model.modalRegionList.regionList,
        ).find(([city, towns]) =>
          towns.some(town => town.regionId === selectedRegion.regionId),
        );

        if (cityEntry) {
          setActiveCity(cityEntry[0]);

          const selectedTown = cityEntry[1].find(
            town => town.regionId === selectedRegion.regionId,
          );

          if (selectedTown) {
            setActiveTown(selectedTown);
          }
        }
      }
    };
    fetchRegionListData();
  }, [modalRegionListController.model.modalRegionList.regionList, selectedRegion]);

  return (
    <>
      {/* 오버레이 */}
      <div className="overlay" onClick={onClose}></div>

      {/* 지역 변경 모달 */}
      <div
        className="region-selector-modal-container"
        onClick={e => e.stopPropagation()}
        ref={modalRef}
      >
        {/* header */}
        <div className="region-selector-modal-header">
          <h1>지역 변경</h1>
          <div className="icon-close" onClick={onClose} />
        </div>

        {/* 관심 지역 */}
        {preferRegions?.length > 0 && (
          <div className="prefer-region-container">
            <div className="prefer-region-title">
              <div className="icon-prefer" />
              <div className="prefer-region-text-container">
                <span>관심 지역</span>
                <p>관심 지역은 마이페이지에서 변경할 수 있어요.</p>
              </div>
            </div>
            <div className="prefer-region-content">
              {preferRegions.map(preferRegion => {
                return (
                  <div
                    key={preferRegion.regionId}
                    className={`prefer-region-btn ${selectedRegion.regionId === preferRegion.regionId ? 'active' : ''}`}
                    onClick={() => handleSelectRegion(preferRegion)}
                  >
                    {preferRegion.regionName}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 지역 선택 */}
        <div className="select-region-container">
          <div className="select-region-title">
            <div className="icon-region" />
            <div className="select-region-text-container">
              <span>지역 선택</span>
              <p>지역은 최대 1개까지 선택할 수 있어요.</p>
            </div>
          </div>
          <div className="select-region-content">
            <div className="select-region-city">
              {Object.keys(modalRegionListController.model.modalRegionList.regionList).length > 0 &&
                Object.keys(modalRegionListController.model.modalRegionList.regionList)
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
                              setActiveCity(prev =>
                                prev === city ? null : city,
                              )
                            }
                          >
                            <span>{city}</span>
                          </div>
                        ))}
                      </div>

                      {activeCity && citiesInRow.includes(activeCity) && (
                        <div className="select-region-town">
                          {modalRegionListController.model.modalRegionList.regionList[
                            activeCity
                          ].map(town => (
                            <div
                              key={town.regionId}
                              className={`select-region-town-item ${
                                activeTown.regionId === town.regionId
                                  ? 'active'
                                  : ''
                              }`}
                              onClick={() => handleSelectRegion(town)}
                            >
                              {town.regionName}
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
    </>
  );
};

export default RegionSelectorModal;
