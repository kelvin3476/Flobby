import React from "react";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <img src={"../../../img/logo/logo.png"} alt="Flobby 로고" className={className} />
  );
};

export default Logo;