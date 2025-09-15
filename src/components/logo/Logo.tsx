import React from "react";
import logo from "@/assets/svg/logo/logo.svg";

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

const Logo = ({ className, onClick }: LogoProps) => {
  return (
    <img src={logo} alt="Flobby" className={className} onClick={onClick} />
  );
};

export default Logo;