import React from "react";
import { useNavigate } from "react-router";
import Header from "../../components/login/Header";
import "../../styles/signup/SuccessSignUp.scss";
import Button from "../../components/button/Button";

const SuccessSignUp = () => {
    const navigate = useNavigate();

    return (
        <div className="signup-container">
            <div className="signup-title">
                <Header className="Header" headerTitle="회원 가입 완료"/>
                <span>[닉네임] 님의 회원가입이 성공적으로 완료되었습니다.</span>
            </div>
            {/*
                TODO: 회원 가입 완료 버튼 클릭시 localstorage 안에 저장되어 있던
                      1. 유저 정보 데이터 및 프로필 설정 완료된 데이터 백엔드로 api 태워서 보내고
                      2. 성공시 메인 페이지로 이동
                      현재 임시 조치:
                      1. 회원 가입 완료 버튼 클릭시 localstorage 안에 저장되어 있던 데이터 날림
                      2. 메인 페이지로 이동
            */}
            <Button
                className="next"
                title="로그인 화면으로"
                onClick={() => navigate('/')}
            />
        </div>
    );
};

export default SuccessSignUp;