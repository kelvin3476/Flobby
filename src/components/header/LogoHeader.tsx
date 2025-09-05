import React from "react";
import { useNavigate } from "react-router-dom";

import Logo from "@/components/logo/Logo";

import "@/styles/header/LogoHeader.scss";

const LogoHeader = () => {
  const nav = useNavigate();

  return (
    <div className="logo-header-container">
      <div className="logo-header-wrapper">
        <Logo className="logo-logo" onClick={() => nav('/')}/>  
      </div>
    </div>
  );
};

export default LogoHeader;
