import React from "react";

import "../../../styles/club/register/Label.scss";

interface LabelProps {
  className?: string;
  labelTitle: string;
}

const Label = ({ className, labelTitle }: LabelProps) => {

  return (
    <div className={`label-container ${className}`}>
      <label>{labelTitle}</label>
      <span>*</span>
    </div>
  );
};

export default Label;