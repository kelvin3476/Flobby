import React from "react";

import "../../styles/login/Header.scss";

interface HeaderProps {
    className?: string;
    headerTitle: string;
}

const Header = ({ className, headerTitle }: HeaderProps) => {
    return (
        <div className={className}>{ headerTitle }</div>
    )
}

export default Header;