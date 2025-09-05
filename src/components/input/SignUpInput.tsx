import React from "react";
import Button from "@/components/button/Button";

interface InputProps {
  type: string;
  name: string;
  value: string;
  onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  isValid,
  errorMessage,
  className,
  placeholder,
  maxLength,
  timer,
  show,
}) => {
  const isWarning = value.length > 0 && !isValid && errorMessage?.[0] === 'warning';
  const isValidClass = value.length > 0 && isValid && errorMessage?.[0] === 'valid';
  const classNames = [
    className ? className : '',
    isWarning ? 'warning' : '',
    isValidClass ? 'valid' : '',
  ].join(' ');

  const isNicknameCheckSuccess = errorMessage?.[1] === '사용 가능한 닉네임입니다.';

  const inputType =
    type !== 'password' ? type : show?.includes(name) ? 'text' : type;

  return (
    <div>
      <input
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classNames}
        maxLength={maxLength}
        style={{ position: 'relative' }}
      />
      {name === 'nickname' && isNicknameCheckSuccess ? (
        <span 
          className="nickname-check-icon"
        />
      ): (
        <ResetButton name={name} value={value} onChange={onChange} />
      )}

      {name === 'verification-code' ? (
        <span className="timer">{timer}</span>
      ) : name === 'password' || name === 'checkPassword' ? (
        <span className="show-password" onClick={handleShowPassword}></span>
      ) : ('')}

      {errorMessage && <p className={errorMessage[0]}>{errorMessage[1]}</p>}
    </div>
  );
};

export default SignUpInput;
