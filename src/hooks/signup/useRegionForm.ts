import React, { useEffect, useRef } from "react";

import useRegionStore from "../../store/signup/useRegionStore";
import SignUp from "../../api/signup/SignUp";

const useRegionForm = () => {
  const { 
    selectedRegionNames, 
    activeCity, 
    setActiveCity: originalSetActiveCity, 
    attemptSelectRegionName,
    attemptSelectRegionId, 
    removeRegion, 
    warning,
    cityDistrictMap,
    setCityDistrictMap,
  } = useRegionStore();

  const townRef = useRef<HTMLDivElement>(null);

  const handleSelect = (city: string, district: string) => {
    const region = `${city} ${district}`;
    const id = cityDistrictMap[city]?.find(r => r.regionName === district)?.regionId.toString();

    if(!id) return;

    attemptSelectRegionName(region);
    attemptSelectRegionId(id);
  };

  const setActiveCity = (city: string) => {
    originalSetActiveCity(city);
    if (townRef.current) {
      townRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const fetchRegions = async() => {

      try {
        const response = await SignUp.getRegionList();
        const { code, message, data } = response.data;

        if (code === 1000) {
          // API 호출 성공
          setCityDistrictMap(data);
        } else if (code === 1001) {
          // API 호출 실패
          throw new Error(message || "데이터를 가져오지 못했습니다.");
        } else if (code === 1002) {
          // API 예외 발생
          throw new Error(message || "서버 오류가 발생했습니다.");
        }
      } catch (err: any) {
        console.log(err.message || "데이터 로드 실패");
      }
    };

    fetchRegions();
  }, []);

  return {
    selectedRegionNames, 
    activeCity, 
    setActiveCity, 
    attemptSelectRegionName,
    attemptSelectRegionId, 
    removeRegion, 
    warning,
    handleSelect,
    cityDistrictMap,
    townRef,
  };
};

export default useRegionForm;