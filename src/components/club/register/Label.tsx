import React from "react";

import "../../../styles/club/register/Label.scss";

interface LabelProps {
  className?: string;
  labelTitle: string;
  isRequired?: boolean;
}

const Label = ({ className, labelTitle, isRequired }: LabelProps) => {

  return (
    <div className={`label-container ${className}`}>
      <label>{labelTitle}</label>
      {isRequired && <span>*</span>}
    </div>
  );
};

export default Label;