import React from 'react';

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className: string;
    title?: string;
    onClick: () => void;
    disabled?: boolean;
    buttonRef?: React.RefObject<HTMLButtonElement>;
}

const Button = ({ type, className, title, onClick, disabled, buttonRef }: ButtonProps) => {
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled} ref={buttonRef}>{title}</button>
    )
}

export default Button;