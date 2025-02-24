import React from "react";
import useLoadingForm from "../../hooks/loading/useLoadingForm";

import loadingSVG from "../../assets/svg/loading/loading-spinner.svg";
import "../../styles/loading/loading.scss";

const LoadingSpinnerController: React.FC = () => {
  const { isLoading } = useLoadingForm();

  return (
    <div className={`loading-container ${isLoading ? "active" : ""}`}>
      <img src={loadingSVG} alt="로그인 중..." />
    </div>
  );
};

export default LoadingSpinnerController;