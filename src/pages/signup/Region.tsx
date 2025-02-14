import React from "react";
import { useNavigate } from "react-router";

import Header from "../../components/login/Header";
import Button from "../../components/button/Button";

import useRegionForm from "../../hooks/signup/useRegionForm";

import "../../styles/signup/Region.scss";

// 지역 리스트 (이후 API 데이터로 대체)
const cityDistrictMap = {
  서울: [
    "강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
  ],
  부산: [
    "강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"
  ],
  대구: [
    "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"
  ],
  인천: [
    "강화군", "계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "옹진군", "중구"
  ],
  경기: [
    "가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"
  ]
};

const Region = () => {
  const nav = useNavigate();

  const { 
    selectedRegions, 
    activeCity, 
    setActiveCity, 
    attemptSelectRegion, 
    removeRegion, 
    warning,
    getRegions,
    handleSelect,
    acceptNext,
  } = useRegionForm();

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
          <div className="region-town">
            {activeCity &&
              cityDistrictMap[activeCity].map((district) => {
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
          <Button 
            className={`next-btn ${selectedRegions.length > 0 ? "active" : ""}`}
            title="다음" 
            onClick={acceptNext} />
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
