import React from 'react';
import '@/styles/tag/Tag.scss';

interface TagProps {
  label: string;
  type: 'challenge' | 'profile';
  color: 'gray' | 'purple';
  size?: 'default' | 'long';
}

const Tag: React.FC<TagProps> = ({ label, type, color, size }) => {
  return (
    <span className={`tag ${type} ${color} ${size ? size : ''}`}>{label}</span>
  );
};

export default Tag;
