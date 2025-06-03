import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TestPage from '../pages/TestPage';

import Main from '../pages/main/Main';
import ClubAll from '../pages/club/ClubAll';
import ClubRegister from '../pages/club/ClubRegister';
import ClubDetail from '../pages/club/ClubDetail';

import Login from '../pages/login/Login';
import FindPassword from '../pages/password/FindPassword';
import ResetPassword from '../pages/password/ResetPassword';
import SuccessPassword from '../pages/password/SuccessPassword';

import Agreement from '../pages/signup/Agreement';
import Registration from '../pages/signup/Registration';
import Region from '../pages/signup/Region';
import SelectHobbies from '../pages/signup/SelectHobbies';
import SuccessSignUp from '../pages/signup/SuccessSignUp';

import KakaoRedirectHandler from '../services/auth/oauth2/KakaoRedirectHandler';
import NaverRedirectHandler from '../services/auth/oauth2/NaverRedirectHandler';
import ClubMeetingModify from '../pages/club/ClubMeetingModify';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/find" element={<FindPassword />} />
        <Route path="/password/reset" element={<ResetPassword />} />
        <Route path="/password/success" element={<SuccessPassword />} />
        <Route path="/signup/agreement" element={<Agreement />} />
        <Route path="/signup/user-info" element={<Registration />} />
        <Route path="/signup/region" element={<Region />} />
        <Route path="/signup/hobby" element={<SelectHobbies />} />
        <Route path="/signup/success" element={<SuccessSignUp />} />
        <Route path="/oauth/kakao" element={<KakaoRedirectHandler />} />
        <Route path="/oauth/naver" element={<NaverRedirectHandler />} />
        <Route path="/club/list" element={<ClubAll />} />
        <Route path="/club/register" element={<ClubRegister />} />
        <Route path="/club/:clubId" element={<ClubDetail />} />
        <Route
          path="/club/meeting/modify/:meetingId"
          element={<ClubMeetingModify />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
