import React from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>Sign Up Page</div>
            {/*
                TODO: 회원 가입 완료 버튼 클릭시 localstorage 안에 저장되어 있던
                      1. 유저 정보 데이터 및 프로필 설정 완료된 데이터 백엔드로 api 태워서 보내고
                      2. 성공시 메인 페이지로 이동
                      현재 임시 조치:
                      1. 회원 가입 완료 버튼 클릭시 localstorage 안에 저장되어 있던 데이터 날림
                      2. 메인 페이지로 이동
            */}
            <button onClick={() => {navigate('/'); localStorage.clear();}}>회원 가입 완료</button>
        </div>
    );
};

export default SignUp;