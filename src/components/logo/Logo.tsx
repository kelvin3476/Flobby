import React from "react";
import logo from "../../assets/svg/logo/logo.svg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <img src={logo} alt="Flobby 로고" className={className} />
  );
};

export default Logo;