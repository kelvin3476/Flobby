import React from "react";

import "../../styles/button/FloatingButton.scss";

interface Option {
  icon: string;
  label?: string;
  onClick: () => void;
}

interface FloatingButtonProps {
  className?: string;
  mainDefaultIcon: string;
  mainActionIcon: string;
  options?: Option[];
}

const FloatingButton = ({
  className,
  mainDefaultIcon,
  mainActionIcon,
  options = [],
}: FloatingButtonProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleFloatingOptions = () => setIsOpen(!isOpen);

  return (
    <div className={`floating-btn-wrapper ${className || ""}`}>
      {isOpen &&
        options.map((option, index) => (
          <div
            key={index}
            className="floating-option-container"
            style={{ bottom: `${(index + 1) * (80 + 16)}px` }} // option 버튼 높이 + 간격
          >
            {option.label && <span className="floating-option-label">{option.label}</span>}
            <button className="floating-option-btn" onClick={option.onClick}>
              <img src={option.icon} alt={`option-${index}`} className="floating-option-btn-img" />
            </button>
          </div>
        ))}

      <button className={`floating-btn ${isOpen ? "open" : ""}`} onClick={toggleFloatingOptions}>
        <img src={isOpen ? mainActionIcon : mainDefaultIcon} alt="floating-btn-main" className="floating-btn-img" />
      </button>
    </div>
  );
};

export default FloatingButton;
