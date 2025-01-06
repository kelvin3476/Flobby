import React from "react";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    className: string;
    title?: string;
    onClick: () => void;
}

const Button = ({ type, className, title, onClick }: ButtonProps) => {
    return (
        <button type={type} className={className} onClick={onClick}>{title}</button>
    )
}

export default Button;