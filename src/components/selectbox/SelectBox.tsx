import React, { useState, useRef, useEffect } from 'react';
import '@/styles/selectbox/SelectBox.scss';

export type Option<T = string> = {
  label: string;
  value: T;
};

export type SelectBoxProps<T = string> = {
  options: Option<T>[];
  value?: T;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
};

export function SelectBox<T extends string | number>({
                                                          options,
                                                          value,
                                                          onChange,
                                                          placeholder = 'default',
                                                          className = '',
                                                        }: SelectBoxProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option: Option<T>) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`select-box ${className}`} onClick={() => setIsOpen((prev) => !prev)}>
      <span className='select-box__label'>{selectedOption?.label || placeholder}</span>
      <span className={`select-box__arrow ${isOpen ? 'up' : ''}`}></span>

      {isOpen && (
        <ul className="select-box__options">
          <span className='select-box__options_title'>정렬 기준</span>
          {options.map((opt) => (
            <li
              key={`${opt.value}`}
              className={`select-box__option ${
                opt.value === value ? 'selected' : ''
              }`}
              onClick={(e) => {
                e.stopPropagation(); // 여기서 버블링 막기
                handleSelect(opt)
              }}
            >
              {opt.label}
              {opt.value === value && (<i></i>)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
