import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

import TestPage from '../pages/TestPage';

import Main from '../pages/main/Main';
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

import ClubAll from '../pages/club/ClubAll';
import ClubRegister from '../pages/club/ClubRegister';
import ClubDetail from '../pages/club/ClubDetail';
import ClubMeetingRegister from '../pages/club/ClubMeetingRegister';
import ClubMeetingEdit from '../pages/club/ClubMeetingEdit';
import ClubSearch from '../pages/club/ClubSearch';

import useAgreeStore from '../store/signup/useAgreeStore';
import useNicknameStore from '../store/nickname/useNicknameStore';
import useEmailStore from '../store/email/useEmailStore';
import usePasswordStore from '../store/signup/usePasswordStore';
import useCitizenStore from '../store/citizenship/useCitizenStore';
import useRegionStore from '../store/signup/useRegionStore';
import useHobbyStore from '../store/signup/useHobbyStore';

const RouterContent: React.FC = () => {
  const location = useLocation();

  const { clearAgreements } = useAgreeStore();
  const { clearNickname } = useNicknameStore();
  const { clearEmail } = useEmailStore();
  const { clearPassword } = usePasswordStore();
  const { clearCitizen } = useCitizenStore();
  const { clearRegion } = useRegionStore();
  const { clearHobby } = useHobbyStore();

  /* 회원가입 관련 페이지 이탈시 localstorage clear 처리 */
  React.useEffect(() => {
    if (!location.pathname.startsWith("/signup")) {
      clearAgreements(); // 모든 약관 동의 상태 초기화
      clearNickname(); // 닉네임 상태 초기화
      clearEmail(); // 이메일 상태 초기화
      clearPassword(); // 비밀번호 상태 초기화
      clearCitizen(); // 국적 상태 초기화
      clearRegion(); // 지역 상태 초기화
      clearHobby(); // 취미 상태 초기화
      
      // 회원가입 관련 페이지 이탈시 localStorage에서 관련 정보 제거
      localStorage.removeItem("agreement-storage");
      localStorage.removeItem("signupTempInfoId");
      localStorage.removeItem("nickname");
      localStorage.removeItem("foreigner");
      localStorage.removeItem("region-storage");
      localStorage.removeItem("hobby-storage");

      // 소셜 로그인 관련 정보 제거
      localStorage.removeItem("socialType")
      localStorage.removeItem("kakao_account");
      localStorage.removeItem("naver_account");
      localStorage.removeItem("apple_account");
      localStorage.removeItem("google_account");
      localStorage.removeItem("facebook_account");
    }
  }, [location.pathname]);

  return (
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
      <Route path="/club/edit" element={<ClubRegister />} />
      <Route
        path="/club/:clubId/clubmeeting/register"
        element={<ClubMeetingRegister />}
      />
      <Route
        path="/club/:clubId/clubmeeting/:meetingId/edit"
        element={<ClubMeetingEdit />}
      />
      <Route path="/club/search" element={<ClubSearch />} />
    </Routes>
  );
};

// ✅ 여기서 BrowserRouter로 감싸기
const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};

export default Router;
