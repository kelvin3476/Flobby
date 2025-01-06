import React from "react";
import Button from "../button/Button";

interface InputProps {
    type: string;
    value: string;
    onClick?: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    isValid: boolean;
    errorMessage: string;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({
    type,
    value,
    onClick,
    onChange,
    onBlur,
    isValid,
    errorMessage,
    placeholder,
}) => {
    return (
        <>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={!isValid ? 'error' : ''}
            />
            {placeholder === "비밀번호를 입력해 주세요." && (
              <Button type="button" className={`password ${type === 'text' ? 'active' : ''}`} onClick={onClick} />
            )}
            <Button type="reset" className={placeholder === "비밀번호를 입력해 주세요." ? 'reset-password' : 'reset'} onClick={() => onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>)} />

            {!isValid && errorMessage && (
                <span className="error-message">{errorMessage}</span>
            )}
        </>
    );
};

export default Input;