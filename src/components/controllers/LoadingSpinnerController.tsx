import React from "react";
import useLoadingForm from "@/hooks/loading/useLoadingForm";

import "@/styles/loading/loading.scss";

const LoadingSpinnerController: React.FC = () => {
  const { isLoading } = useLoadingForm();

  return (
    <div className={`loading-container ${isLoading ? "active" : ""}`}>
      <li className="ball"></li>
      <li className="ball"></li>
      <li className="ball"></li>
    </div>
  );
};

export default LoadingSpinnerController;