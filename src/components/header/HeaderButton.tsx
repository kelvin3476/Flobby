import React from "react";

import "../../styles/header/HeaderButton.scss";

interface HeaderButtonProps {
  className?: string;
  buttonName: string;
}

const HeaderButton = ({ className, buttonName }: HeaderButtonProps) => {
  return (
    <button className={className}>{buttonName}</button>
  );
};

export default HeaderButton;