import React from "react";
import Button from "../button/Button";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typename: string;
  onClick: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  typename,
  onClick,
}) => {
  return (
    <>
      <label>
        <input 
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span>{typename}</span>
        <Button
          type="button"
          className="goto_service"
          onClick={onClick}
          title="약관보기"
        />
      </label>
    </>
  );
};

export default Checkbox;