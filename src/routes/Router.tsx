import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import FindPassword from "../pages/password/FindPassword";
import ResetPassword from "../pages/password/ResetPassword";
import SuccessPassword from "../pages/password/SuccessPassword";
import SignUp from "../pages/signup/SignUp";
import OAuth2RedirectHandler from "../services/auth/oauth2/OAuth2RedirectHandler";
import SelectHobbies from "../pages/signup/SelectHobbies";

const Router: React.FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password/find" element={<FindPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/password/success" element={<SuccessPassword />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/hobby" element={<SelectHobbies />} />
          <Route path="/oauth/kakao" element={<OAuth2RedirectHandler />} /> {/* TODO: 최초 회원가입시: 회원 가입 페이지 > 프로필 설정 으로 넘기기 & 기존 회원 로그인시: 메인 페이지로 이동 */}
        </Routes>
      </BrowserRouter>
    );
};

export default Router;