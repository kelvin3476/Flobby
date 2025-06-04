import React from "react";

import "../../styles/modal/DropDownModal.scss";

interface DropDownModalProps {
  className: string;
  items: string[];
  onItemClick?: (item: string, idx: number) => void;
}

const DropDownModal = ({ className, items, onItemClick }: DropDownModalProps) => {
  return (
    <div className={`drop-modal-container ${className}`}>
      <div className="drop-modal-wrapper">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="drop-item"
            onClick={() => onItemClick?.(item, idx)}
          >{item}</span>
        ))}
      </div>
    </div>
  );
};

export default DropDownModal;