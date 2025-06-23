import React from "react";

import Header from "../../components/login/Header";
import LogoHeader from "../../components/header/LogoHeader";
import Button from "../../components/button/Button";

import "../../styles/signup/SuccessSignUp.scss";

import useSuccessSignupForm from "../../hooks/signup/success/useSuccessSignupForm";

const SuccessSignUp = () => {
    const { finalSocialSignUpHandler, finalSignUpHandler } = useSuccessSignupForm();

    return (
      <div className="signup-container">
        <LogoHeader />
        <div className="signup-title">
          <Header className="Header" headerTitle="회원 가입 완료" />
          <span>[{localStorage.getItem('nickname')}] 님의 회원가입이 성공적으로 완료되었습니다.</span>
        </div>
        <Button
          className="next"
          title="로그인 화면으로"
          onClick={localStorage.getItem('socialType') ? finalSocialSignUpHandler : finalSignUpHandler}
        />
      </div>
    );
};

export default SuccessSignUp;