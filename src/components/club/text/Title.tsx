import React from "react";

import "@/styles/club/text/Title.scss";

interface TitleProps {
  className?: string;
  titleName: string;
}

const Title = ({ className, titleName }: TitleProps) => {
  return (
    <div className={`club-title ${className}`}>{titleName}</div>
  );
};

export default Title;