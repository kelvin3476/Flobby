import React from "react";

interface ButtonProps {
    className: string;
    title?: string;
    onClick: () => void;
}

const Button = ({ className, title, onClick }: ButtonProps) => {
    return (
        <button className={className} onClick={onClick}>{title}</button>
    )
}

export default Button;