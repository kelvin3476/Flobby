import React from 'react';

import '../../../styles/club/register/Label.scss';

interface LabelProps {
  className?: string;
  labelTitle: string;
  isRequired?: boolean;
  htmlFor?: string;
}

const Label = ({ className, labelTitle, isRequired, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`label-container ${className ? className : ''}`}
    >
      <span className="label-title">{labelTitle}</span>
      {isRequired && <span className="label-required">*</span>}
    </label>
  );
};

export default Label;
