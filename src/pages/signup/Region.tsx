import React from "react";
import { useNavigate } from "react-router";
import useRegionStore from "../../store/join/useRegionStore";

import Header from "../../components/login/Header";
import Button from "../../components/button/Button";

import "../../styles/join/Region.scss";


// 지역 리스트 (이후 API 데이터로 대체)
const cityList = ["서울", "부산", "대구", "인천", "경기"];
const districtList = [
  "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구",
  "해운대구", "사상구", "달서구", "수성구", "중구", "남동구", "연수구", "부평구", "수원시",
  "용인시", "고양시"];

const Region = () => {
  const nav = useNavigate();
  const { 
    selectedRegions, activeCity, setActiveCity, attemptSelectRegion, removeRegion, warning 
  } = useRegionStore();

  const handleSelect = (city: string, district: string) => {
    const region = `${city} ${district}`;
    attemptSelectRegion(region);
  };

  return (
    <div className="region-container">
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
            {cityList.map((city) => (
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
          <div className="region-town">
            {activeCity &&
              districtList.map((district) => {
                const isSelected = selectedRegions.includes(`${activeCity} ${district}`);
                return (
                  <div
                    key={district}
                    className={`region-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelect(activeCity, district)}
                  >
                    <span>{district}</span>
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
          <Button className="next-btn" title="다음" onClick={() => nav("/next")} />
          <Button className="pass-btn" title="건너뛰기" onClick={() => nav("/next")} />
        </div>
      </main>
    </div>
  );
};

export default Region;
