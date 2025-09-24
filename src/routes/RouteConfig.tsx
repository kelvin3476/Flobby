// routes/RouteConfig.tsx
import React from 'react';

/* 라우팅 되는 페이지 컴포넌트 import */
import TestPage from '@/pages/TestPage';
import Main from '@/pages/main/Main';
import Login from '@/pages/login/Login';
import FindPassword from '@/pages/password/FindPassword';
import ResetPassword from '@/pages/password/ResetPassword';
import SuccessPassword from '@/pages/password/SuccessPassword';
import Agreement from '@/pages/signup/Agreement';
import Registration from '@/pages/signup/Registration';
import Region from '@/pages/signup/Region';
import SelectHobbies from '@/pages/signup/SelectHobbies';
import SuccessSignUp from '@/pages/signup/SuccessSignUp';
import KakaoRedirectHandler from '@/services/auth/oauth2/KakaoRedirectHandler';
import NaverRedirectHandler from '@/services/auth/oauth2/NaverRedirectHandler';
import ClubAll from '@/pages/club/ClubAll';
import ClubRegister from '@/pages/club/ClubRegister';
import ClubDetail from '@/pages/club/ClubDetail';
import ClubMeetingRegister from '@/pages/club/ClubMeetingRegister';
import ClubSearch from '@/pages/club/ClubSearch';
import MyPage from '@/pages/mypage/MyPage';

export const RouteConfig = [
  { path: '/test', element: <TestPage />, title: '테스트' },
  { path: '/', element: <Main />, title: '메인' },
  { path: '/login', element: <Login />, title: '로그인' },

  { path: '/password/find', element: <FindPassword />, title: '비밀번호 찾기' },
  {
    path: '/password/reset',
    element: <ResetPassword />,
    title: '비밀번호 초기화',
  },
  {
    path: '/password/success',
    element: <SuccessPassword />,
    title: '비밀번호 변경 완료',
  },

  { path: '/signup/agreement', element: <Agreement />, title: '약관 동의' },
  {
    path: '/signup/user-info',
    element: <Registration />,
    title: '유저 정보 입력',
  },
  { path: '/signup/region', element: <Region />, title: '지역 선택' },
  { path: '/signup/hobby', element: <SelectHobbies />, title: '취미 선택' },
  {
    path: '/signup/success',
    element: <SuccessSignUp />,
    title: '회원가입 완료',
  },

  {
    path: '/oauth/kakao',
    element: <KakaoRedirectHandler />,
    title: '카카오 소셜 로그인',
  },
  {
    path: '/oauth/naver',
    element: <NaverRedirectHandler />,
    title: '네이버 소셜 로그인',
  },

  { path: '/club/list', element: <ClubAll />, title: '모임 전체' },
  { path: '/club/register', element: <ClubRegister />, title: '모임 등록' },
  { path: '/club/:clubId', element: <ClubDetail />, title: '모임 상세' },
  { path: '/club/edit', element: <ClubRegister />, title: '모임 수정' },

  {
    path: '/club/:clubId/clubmeeting/register',
    element: <ClubMeetingRegister />,
    title: '정기 모임 등록',
  },
  {
    path: '/club/:clubId/clubmeeting/edit',
    element: <ClubMeetingRegister />,
    title: '정기 모임 수정',
  },

  { path: '/club/search', element: <ClubSearch />, title: '모임 검색' },

  { path: '/mypage', element: <MyPage />, title: '마이 페이지' },
];
