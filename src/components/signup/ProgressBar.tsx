import React, { useEffect } from "react";
import { useLocation } from "react-router";

import useProgressStore from "../../store/signup/useProgressStore";
import "../../styles/signup/ProgressBar.scss";

const ProgressBar: React.FC = () => {
  const {
    step,
    setStep,
  } = useProgressStore();
  
  const location = useLocation();

  const StepMap: Record<string, string> = {
    "/signup/agreement": "step-agreement",
    "/signup/user-info": "step-user-info",
    "/signup/region": "step-region",
    "/signup/hobby": "step-hobby",
    "/signup/success": "step-success",
  };

  useEffect(() => {
    const stepKey = StepMap[location.pathname] || "step-agreement";

    setTimeout(() => {
      setStep(stepKey);
    }, 0);
  }, [location.pathname]);

  return (
    <div className="progress-container">
        <div className="line1"></div>
        <div className="line2"></div>
        <div 
          className="progress-bar"
          style={{"--step-name": step} as React.CSSProperties}
        ></div>
    </div>
  );

};

export default ProgressBar;