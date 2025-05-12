import React from "react";

import "../../../styles/club/create/Label.scss";

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