import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router";

import useRegionStore from "../../store/signup/useRegionStore";
import SignUp from "../../api/signup/SignUp";

const useRegionForm = () => {
  const { 
    selectedRegions, 
    activeCity, 
    setActiveCity: originalSetActiveCity, 
    attemptSelectRegion, 
    removeRegion, 
    warning,
    getRegions,
    cityDistrictMap,
    setCityDistrictMap,
  } = useRegionStore();

  const nav = useNavigate();
  const townRef = useRef<HTMLDivElement>(null);

  const handleSelect = (city: string, district: string) => {
    const region = `${city} ${district}`;
    attemptSelectRegion(region);
  };

  const acceptNext = () => {
    if (selectedRegions.length > 0) {
      nav ('/signup/hobby', { state: getRegions() });
    }
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
    selectedRegions, 
    activeCity, 
    setActiveCity, 
    attemptSelectRegion, 
    removeRegion, 
    warning,
    getRegions,
    handleSelect,
    acceptNext,
    cityDistrictMap,
    townRef,
  };
};

export default useRegionForm;