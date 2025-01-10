import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import Login from "../pages/Login";
import FindPassword from "../pages/FindPassword";

const Router: React.FC = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<FindPassword />} />
        </Routes>
      </BrowserRouter>
    );
};

export default Router;