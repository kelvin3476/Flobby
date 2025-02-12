import React from "react";
import { useNavigate } from "react-router";

import Button from "../button/Button";

import "../../styles/login/Footer.scss";

interface FooterProps {
    footerTitle: string;
}

const Footer = ({ footerTitle }: FooterProps) => {
    const navigate = useNavigate();

    return (
      <div>
        <div className="footer-container">
          <span>{ footerTitle }</span>

          <Button
            className="signup-button"
            title="회원 가입"
            onClick={() => navigate('/signup')}
          />
        </div>

      </div>
    );
}

export default Footer;