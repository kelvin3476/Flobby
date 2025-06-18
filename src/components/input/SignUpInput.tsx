import React from "react";
import Button from "../button/Button";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isValid: boolean;
  errorMessage?: [string, string];
  placeholder: string;
  className?: string;
  maxLength: number;
  timer?: string; 
  show?: string[];
}

const ResetButton: React.FC<{
  value: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}> = ({ value, name, onChange }) => (
  <Button
    type="reset"
    className={`reset ${
      value.length &&
      (name == 'verification-code' ||
      name === 'password' ||
      name === 'checkPassword'
        ? 'show right45'
        : name === 'email'
          ? 'show right12'
          : 'show')
    }`}
    onClick={() =>
      onChange({ target: { name, value: '' } } as React.ChangeEvent<HTMLInputElement>)
    }
  />
);

const handleShowPassword = (e: React.MouseEvent) => {
  // `span`의 바로 이전 형제 요소를 찾고, 그 이전 형제 요소가 `input`이므로 두 번의 `previousElementSibling` 사용
  const inputElement = e.currentTarget.previousElementSibling
    ?.previousElementSibling as HTMLInputElement;

  if (inputElement && inputElement.tagName === 'INPUT') {
    inputElement.type = inputElement.type === 'password' ? 'text' : 'password';
  }
};

const SignUpInput: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  onBlur,
  isValid,
  errorMessage,
  className,
  placeholder,
  maxLength,
  timer,
  show,
}) => {
  const isValidWarning = value.length > 0 && !isValid ? 'warning' : '';

  const inputType =
    type !== 'password' ? type : show?.includes(name) ? 'text' : type;

  return (
    <div>
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`${className ? className : ''} ${isValidWarning}`}
        maxLength={maxLength}
        style={{ position: 'relative' }}
      />
      <ResetButton name={name} value={value} onChange={onChange} />
      {name === 'verification-code' ? (
        <span className="timer">{timer}</span>
      ) : name === 'password' || name === 'checkPassword' ? (
        <span className="show-password" onClick={handleShowPassword}></span>
      ) : (
        ''
      )}
      {errorMessage && <p className={errorMessage[0]}>{errorMessage[1]}</p>}
    </div>
  );
};

export default SignUpInput;
