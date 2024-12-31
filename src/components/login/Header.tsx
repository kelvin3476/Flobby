import React from "react";

import "../../styles/login/Header.scss";

interface HeaderProps {
    headerTitle: string;
}

const Header = ({ headerTitle }: HeaderProps) => {
    return (
        <div>{ headerTitle }</div>
    )
}

export default Header;