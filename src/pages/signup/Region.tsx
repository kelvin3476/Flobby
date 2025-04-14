import React from "react";
import { useNavigate } from "react-router";

import Header from "../../components/login/Header";
import Button from "../../components/button/Button";
import ProgressBar from "../../components/signup/ProgressBar";

import useRegionForm from "../../hooks/signup/useRegionForm";

import "../../styles/signup/Region.scss";

const Region = () => {
  const nav = useNavigate();

  const { 
    selectedRegions, 
    activeCity, 
    setActiveCity, 
    removeRegion, 
    warning,
    handleSelect,
    cityDistrictMap,
    townRef,
  } = useRegionForm();

  

  return (
    <div className="region-container">
      <ProgressBar />
      <div className="region-title">
        <Header className="Header" headerTitle="주로 활동하는 지역이 어디신가요?" />
        <span className={warning ? "error" : ""}>
          관심 지역은 최대 3개까지 선택할 수 있어요. ({selectedRegions.length}/3)
        </span>
      </div>

      <main>
        <div className="region-selector">
          {/* 1. 도시 리스트 */}
          <div className="region-city">
            {Object.keys(cityDistrictMap).map((city) => (
              <div
                key={city}
                className={`region-item ${activeCity === city ? "active" : ""}`}
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
                ?.filter((district) => !district.regionName.includes("전체"))
                .map((district) => {
                  const regionName = district.regionName;
                  const regionId = district.regionId;
                  const isSelected = selectedRegions.includes(`${activeCity} ${regionName}`);
                  return (
                    <div
                      key={regionId}
                      className={`region-item ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelect(activeCity, regionName)}
                    >
                      <span>{regionName}</span>
                    </div>
                  );
                })}
          </div>

          {/* 3. 선택된 지역 */}
          <div className="region-selected">
            {selectedRegions.map((region) => (
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
          <Button 
            className={`next-btn ${selectedRegions.length > 0 ? "active" : ""}`}
            title="다음" 
            onClick={() => {
              if (selectedRegions.length > 0) {
                nav("/signup/hobby");
              }
            }} />
          <Button 
            className="pass-btn" 
            title="건너뛰기" 
            onClick={() => nav("/signup/hobby")} />
        </div>
      </main>
    </div>
  );
};

export default Region;
