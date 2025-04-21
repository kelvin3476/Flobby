import React from "react";

import "../../styles/button/TextButton.scss";

interface TextButtonProps {
  className?: string;
  buttonName: string;
  onClick: () => void;
}

const TextButton = ({ className, buttonName, onClick }: TextButtonProps) => {
  return (
    <button className={className} onClick={onClick}>{buttonName}</button>
  );
};

export default TextButton;