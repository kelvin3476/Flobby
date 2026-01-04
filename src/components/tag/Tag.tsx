import React from 'react';
import '@/styles/tag/Tag.scss';

interface TagProps {
  label: string;
  type: 'challenge' | 'profile' | 'thumbnail';
  color: 'gray' | 'purple' | 'green';
  size?: 'default' | 'long';
}

const Tag: React.FC<TagProps> = ({ label, type, color, size }) => {
  return (
    <span className={`tag ${type} ${color} ${size ? size : ''}`}>{label}</span>
  );
};

export default Tag;
