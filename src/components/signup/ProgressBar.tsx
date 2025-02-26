import React, { useEffect } from "react";
import { useLocation } from "react-router";

import useProgressStore from "../../store/signup/useProgressStore";
import "../../styles/signup/ProgressBar.scss";

const ProgressBar: React.FC = () => {
  const {
    setStep, 
    progressWidth
  } = useProgressStore();
  
  const location = useLocation();

  const stepMap: Record<string, number> = {
    "/signup/agreement": 1,
    "/signup/정보입력": 2,
    "/signup/region": 3,
    "/signup/hobby": 4,
    "/signup/success": 5,
  };

  useEffect(() => {
    const currentStep = stepMap[location.pathname];
    setStep(currentStep);
  }, [location.pathname, setStep]);

  return (
    <div className="progress-container">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="progress-bar" style={{width: `${progressWidth}px`}}></div>
    </div>
  );

};

export default ProgressBar;