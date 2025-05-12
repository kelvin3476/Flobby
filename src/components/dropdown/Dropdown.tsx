import React, { useEffect, useState } from 'react';
import '../../styles/dropdown/Dropdown.scss';

interface DropDownProps {
  options: any[];
  defaultItem?: string;
  disabled: boolean;
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const DropDown = ({
  options,
  defaultItem,
  disabled,
  placeholder,
  onSelect,
}: DropDownProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(defaultItem);

  useEffect(() => {
    setActiveItem(defaultItem);
  }, [defaultItem]);

  return (
    <div className="drop-down-wrapper">
      <div
        className={`drop-down-container ${isDropDownOpen ? 'active' : ''}`}
        onClick={() => {
          if (disabled) return;
          setIsDropDownOpen(!isDropDownOpen);
        }}
      >
        {}
        <div
          className={`drop-down-label ${disabled ? 'disabled' : ''} ${
            !activeItem ? 'placeholder' : ''
          }`}
        >
          {activeItem || placeholder}
        </div>
        <div
          className={`drop-down-icon-box ${isDropDownOpen ? 'active' : ''}`}
        ></div>
      </div>

      {!disabled && isDropDownOpen && (
        <div className="drop-down-list-container">
          <div className="drop-down-list-content-box">
            {options.map((option, index) => (
              <div
                key={index}
                className={`drop-down-list-item-box ${activeItem === option ? 'active' : ''}`}
                onClick={() => {
                  setActiveItem(option);
                  setIsDropDownOpen(false);
                  onSelect?.(option);
                }}
              >
                <div className="drop-down-list-label">{option}</div>
                {activeItem === option && (
                  <div className="drop-down-list-icon-box"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDown;
