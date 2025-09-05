import React from "react";
import Button from "@/components/button/Button";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typename: string;
  onClick?: () => void;
  withButton?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  typename,
  onClick,
  withButton = true,
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
        {withButton && onClick && (
          <Button
            type="button"
            className="goto_service"
            onClick={onClick}
            title="약관보기"
          />
        )}
      </label>
    </>
  );
};

export default Checkbox;