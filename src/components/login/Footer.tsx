import React from "react";
import Button from "../button/Button";

import "../../styles/login/Footer.scss";

interface FooterProps {
    footerTitle: string;
}

const Footer = ({ footerTitle }: FooterProps) => {
    return (
      <div>
        <div className="signup-container">
          <span>{ footerTitle }</span>

          <Button
            className="signup-button"
            title="회원 가입"
            onClick={() => console.log('회원가입 버튼 클릭!!')}
          />
        </div>

      </div>
    );
}

export default Footer;