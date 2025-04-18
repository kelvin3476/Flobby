import React from "react";

import "../../styles/header/HeaderButton.scss";

interface HeaderButtonProps {
  className?: string;
  buttonName: string;
  onClick: () => void;
}

const HeaderButton = ({ className, buttonName, onClick }: HeaderButtonProps) => {
  return (
    <button className={className} onClick={onClick}>{buttonName}</button>
  );
};

export default HeaderButton;