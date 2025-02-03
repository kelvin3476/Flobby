import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/login/Login";
import FindPassword from "../pages/password/FindPassword";
import ResetPassword from "../pages/password/ResetPassword";
import SuccessPassword from "../pages/password/SuccessPassword";
import Agreement from "../pages/join/Agreement";

const Router: React.FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password/find" element={<FindPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/password/success" element={<SuccessPassword />} />
          <Route path="/join/agreement" element={<Agreement />} />
        </Routes>
      </BrowserRouter>
    );
};

export default Router;