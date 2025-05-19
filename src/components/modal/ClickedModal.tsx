import React from "react";

import "../../styles/modal/ClickedModal.scss";

interface ClickedProps {
  className: string;
  firstTitle?: string;
  secondTitle?: string;
  // onClick: () => void;
}

const ClickedModal = ({ className, firstTitle, secondTitle }: ClickedProps) => {
  return (
    <div className={`clicked-modal-container ${className}`}>
      <div className="clicked-wrapper">
        <span>{firstTitle}</span>
        <span>{secondTitle}</span>
      </div>
    </div>
  );
};

export default ClickedModal;