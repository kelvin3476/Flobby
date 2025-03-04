/* -------------------- 로그인 api 타입 -------------------- */

/* 최초 Access Token & Refresh Token 발급시 필요한 데이터 셋 */
export interface GenerateTokenData {
  memberId: number;
  email: string;
}

/* -------------------- 소셜 로그인 api 타입 -------------------- */

/* 소셜 로그인 유저 정보 데이터셋 */
export interface SocialUserData {
  email: string;
  ageRange: string;
}

/* 소셜 회원 가입 완료 처리에 필요한 데이터 셋 */
export interface SignupData extends SocialUserData {
  socialType: string;
  term1: string;
  term2: string;
  term3: string;
  nickname: string;
  profilePhoto: string;
  region1: string;
  region2: string;
  region3: string;
  interest1: string;
  interest2: string;
  interest3: string;
  foreignerYn: string;
}

/* -------------------- 자체 회원가입 api 타입 -------------------- */

/* 웹 자체회원가입 유저정보 임시테이블에 저장할 데이터 셋 */
export interface WebTempSignupData {
  email: string;
  nickname: string;
  localPassword: string;
}

/* 웹 자체회원가입*/
export interface WebSignupData extends WebTempSignupData {
  term1: string;
  term2: string;
  term3: string;
  profilePhoto: string;
  region1: string;
  region2: string;
  region3: string;
  interest1: string;
  interest2: string;
  interest3: string;
  foreigner: string;
}

/* -------------------- 비밀번호 api 타입 -------------------- */

/* 비밀번호 변경에 필요한 데이터 셋 */
export interface PasswordData {
  password: string;
  confirmPassword: string;
}