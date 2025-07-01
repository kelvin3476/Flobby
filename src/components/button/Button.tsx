import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className: string;
    title?: string;
    onClick: () => void;
    disabled?: boolean;
}

const Button = ({ type, className, title, onClick, disabled }: ButtonProps) => {
    return (
        <button type={type} className={className} onClick={onClick} disabled={disabled}>{title}</button>
    )
}

export default Button;