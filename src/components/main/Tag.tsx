import React from "react";
import "../../styles/main/Tag.scss";

interface TagProps {
  label: string;
  type: "hobby" | "size";
}

const Tag: React.FC<TagProps> = ({ label, type }) => {
  return (
    <span className={`tag ${type}`}>{label}</span>
  );
};

export default Tag;