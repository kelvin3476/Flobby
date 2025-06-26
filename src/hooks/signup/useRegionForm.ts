import React, { useEffect, useRef } from "react";

import useRegionStore from "../../store/signup/useRegionStore";
import { ModalRegionListController } from "../../services/region/controllers/ModalRegionListController";

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

  const modalRegionListController = ModalRegionListController.getInstance();

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
    const fetchRegions = async () => {
      try {
        const response = await modalRegionListController.getModalRegionList();
        setCityDistrictMap(response.regionList);
      } catch (error) {
        console.error('지역 데이터 불러오기 실패', error);
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