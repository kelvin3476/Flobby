import React from 'react';

import '@/styles/button/Chip.scss'

interface ChipProps {
  text: string;
  onClick?: () => void;
  onDelete?: () => void;
}

const Chip = ({ text, onClick, onDelete }: ChipProps) => {
  return (
    <div className='chip-container'>
      <span className='chip-text' onClick={onClick}>{text}</span>
      <button className='chip-text-delete-btn' onClick={onDelete}></button>
    </div>
  );
};

export default Chip;