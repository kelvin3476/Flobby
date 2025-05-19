import React from "react";

import "../../styles/modal/DropDownModal.scss";

interface DropDownModalProps {
  className: string;
  firstTitle?: string;
  secondTitle?: string;
}

const DropDownModal = ({ className, firstTitle, secondTitle }: DropDownModalProps) => {
  return (
    <div className={`drop-modal-container ${className}`}>
      <div className="drop-modal-wrapper">
        <span className="drop-first">{firstTitle}</span>
        <span className="drop-second">{secondTitle}</span>
      </div>
    </div>
  );
};

export default DropDownModal;