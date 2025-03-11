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

  useEffect(() => {
    setStep(location.pathname);
  }, [location.pathname, setStep]);

  return (
    <div className="progress-container">
        <div className="line1"></div>
        <div className="line2"></div>
        <div className={`progress-bar ${step}`}></div>
    </div>
  );

};

export default ProgressBar;