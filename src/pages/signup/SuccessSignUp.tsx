import React from "react";

import Header from "../../components/login/Header";
import Button from "../../components/button/Button";
import ProgressBar from "../../components/signup/ProgressBar";

import "../../styles/signup/SuccessSignUp.scss";

import useSuccessSignupForm from "../../hooks/signup/success/useSuccessSignupForm";

const SuccessSignUp = () => {
    const { finalSocialSignUpHandler, finalSignUpHandler } = useSuccessSignupForm();

    return (
      <div className="signup-container">
        <ProgressBar />
        <div className="signup-title">
          <Header className="Header" headerTitle="회원 가입 완료" />
          <span>[{localStorage.getItem('nickname')}] 님의 회원가입이 성공적으로 완료되었습니다.</span>
        </div>
        <Button
          className="next"
          title="로그인 화면으로"
          onClick={localStorage.getItem('socialType') ? finalSocialSignUpHandler : finalSignUpHandler}
        />
        <footer>
          <div className="success-line1"></div>
          <div className="success-line2"></div>
        </footer> 
      </div>
    );
};

export default SuccessSignUp;