import React from "react";

interface InputProps {
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
    isValid: boolean;
    errorMessage: string;
    placeholder: string;
}

const Input: React.FC<InputProps> = ({
    type,
    value,
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
            <button type="reset" onClick={() => onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>)}></button>

            {!isValid && errorMessage && (
                <span className="error-message">{errorMessage}</span>
            )}
        </>
    );
};

export default Input;