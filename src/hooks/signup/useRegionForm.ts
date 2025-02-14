import React from "react";
import useRegionStore from "../../store/signup/useRegionStore";

import { useNavigate } from "react-router";

const useRegionForm = () => {
  const { 
    selectedRegions, 
    activeCity, 
    setActiveCity, 
    attemptSelectRegion, 
    removeRegion, 
    warning,
    getRegions,
  } = useRegionStore();

  const nav = useNavigate();

  const handleSelect = (city: string, district: string) => {
    const region = `${city} ${district}`;
    attemptSelectRegion(region);
  };

  const acceptNext = () => {
    if (selectedRegions.length > 0) {
      nav ('/signup/hobby', { state: getRegions() });
    }
  };

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
  };
};

export default useRegionForm;