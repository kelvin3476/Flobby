import React from "react";
import "../../styles/main/Tag.scss";

interface TagProps {
  label: string;
  type: string;
  color: string;
}

const Tag: React.FC<TagProps> = ({ label, type, color }) => {
  return (
    <span className={`tag ${type} ${color}`}>{label}</span>
  );
};

export default Tag;