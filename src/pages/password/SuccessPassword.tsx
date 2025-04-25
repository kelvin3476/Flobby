import React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/login/Header";
import Button from "../../components/button/Button";

import "../../styles/password/SuccessPassword.scss";

const SuccessPassword = () => {
    const navigate = useNavigate();

    return (
        <div className="success-password-container">
            <div className="success-password-title">
                <Header className="Header" headerTitle="비밀번호 변경 완료" />
                <span>비밀번호 변경이 완료되었습니다. 새로운 비밀번호로 로그인해 주세요.</span>
            </div>

            <Button className="move-login-button" title="로그인 화면으로" onClick={() => navigate('/')} />
        </div>
    );
};

export default SuccessPassword;