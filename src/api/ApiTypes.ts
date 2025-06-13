/* -------------------- 로그인 api 타입 -------------------- */

/* 최초 Access Token & Refresh Token 발급시 필요한 데이터 셋 */
export interface GenerateTokenData {
  memberId: number;
  email: string;
}

/* 자체 로그인 시 필요한 데이터 셋 */
export interface WebLoginData {
  email: string;
  password: string;
}

/* -------------------- 회원가입 공통 기본 api 타입 -------------------- */

export interface BaseSignupData {
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
}

/* -------------------- 소셜 로그인 api 타입 -------------------- */

/* 소셜 로그인 유저 정보 데이터셋 */
export interface SocialUserData {
  email: string;
  ageRange: string;
}

/* 소셜 회원 가입 완료 처리에 필요한 데이터 셋 */
export interface SocialSignupData extends SocialUserData, BaseSignupData {
  socialType: string;
  nickname: string;
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
export interface WebSignupData extends BaseSignupData {
  signupTempInfoId: number;
  foreigner: string;
}

/* -------------------- 비밀번호 api 타입 -------------------- */

/* 비밀번호 변경에 필요한 데이터 셋 */
export interface PasswordData {
  password: string;
  confirmPassword: string;
}

/* -------------------- 지역 리스트 api 타입 -------------------- */

/* 지역 리스트 불러 올때 response 데이터 타입 */
export interface RegionItem {
  regionName: string;
  regionId: number;
}

/* -------------------- 취미 카테고리 리스트 api 타입 -------------------- */

/* 취미 카테고리 리스트 불러 올때 response 데이터 타입 */
export interface HobbyCategory {
  mainCategory: string;
  subCategories: string[];
}

/* -------------------- 메인 페이지 api 타입 -------------------- */

/* 모임 response 데이터 타입 */
export interface clubItem {
  clubId: number;
  photo?: string;
  hostId: number;
  hostNickname: string;
  category: string;
  maxMember: string;
  clubName: string;
  regionId: string;
  locationName: string;
  currentMembers: number;
  subCategory: string;
  postCategory: string;
}

/* 원데이 response 데이터 타입 */
export interface onedayItem {
  category: string;
  title: string;
  location: string;
  locationName: string;
  currentMembers: number;
  maxMembers: number;
  scheduledDate: string;
  nickname: string;
  hostId: number;
  profilePhoto?: string /* TODO: 백엔드에서 원데이 정보 부분 프로필 이미지 서버 url string 으로 내려주는 부분 추후 확인 필요 */;
  imageUrl?: string /* TODO: 백엔드에서 원데이 카드 이미지 썸네일 서버 url string 으로 내려주는 부분 추후 확인 필요 */;
}

/* 실시간 인기 게시글 response 데이터 타입 */
export interface boardItem {
  id: number;
  title: string;
  content: string;
  views: number;
  likes: number;
  created_at: string;
}

/* 메인 페이지 모임, 원데이, 실시간 인기 게시글 데이터셋 */
export interface MainData {
  region: RegionItem[];
  clubItems: clubItem[];
  onedayItems: onedayItem[];
  boardItems: boardItem[];
  selectedRegion: RegionItem;
}

/* -------------------- 모임 게시글 api 타입 -------------------- */

/* 모임 게시글 생성시 필요한 json 데이터셋 */
export interface CreateClubJsonData {
  clubName: string;
  description: string;
  mainCategory: string;
  subCategory: string;
  location: number;
  maxMembers: number;
}

/* 모임 게시글 생성시 필요한 전체 데이터셋 */
export interface CreateClubData extends CreateClubJsonData {
  file: File;
  data: CreateClubJsonData;
}

/* -------------------- 모임 상세 api 타입 -------------------- */

/* 모임 상세 조회 응답 데이터 타입 */
export interface ClubItemDetail {
  clubDTO: ClubDTO;
  clubMeetingList: ClubMeetingListItem[];
  clubMemberList: ClubMemberListItem[];
  recommendClubList: RecommendClubListItem[];
  isMember: boolean; // 모임 가입 여부
  loginMemberId: number | null; // 로그인 했을 경우 memberId 값, 비로그인 상태면 null로 넘어옴
  role: ClubRoleType; // 모임 권한
}

/* 모임 상세 데이터 타입 */
export interface ClubDTO {
  clubId: number;
  clubImage: string;
  clubName: string;
  currentMembers: number;
  description: string;
  location: string;
  maxMembers: number;
  subCategory: string;
}

/* -------------------- 모임 검색 api 타입 -------------------- */

/* 모임 검색 response 데이터 타입 */
export interface ClubSearchItem {
  clubList: clubItem[];
  dataType: 'Search Data' | 'Recommend Data';
}

/* -------------------- 정기 모임 api 타입 -------------------- */

/* 정기 모임 데이터 타입 */
export interface ClubMeetingListItem {
  clubMeetingDate: string;
  clubMeetingLocation: string;
  clubMeetingTime: string;
  clubMeetingTitle: string;
  currentParticipants: number;
  dday: string;
  entryfee: string;
  isApplied: boolean;
  maxParticipants: number;
  meetingId: number;
  meetingLeaderId: number; // 정기 모임 생성자의 memberId
  status: string;
}

/* 모임 멤버 데이터 타입 */
export interface ClubMemberListItem {
  clubMemberId: number;
  nickname: string;
  profilePhoto: string;
  role: ClubRoleType;
}

/* 추천 모임 데이터 타입 */
export interface RecommendClubListItem {
  clubId: number;
  clubImage: string;
  clubName: string;
  currentMembers: number;
  location: string;
  mainCategory: string;
  maxMembers: number;
  subCategory: string;
}

/* 정기 모임 생성시 필요한 json 데이터셋 */
export interface CreateClubMeetingData {
  clubMeetingTitle: string;
  clubMeetingDate: string;
  clubMeetingTime: string;
  clubMeetingLocation: string;
  maxParticipants: number;
  entryfee?: string;
}

export type ClubRoleType = 'LEADER' | 'MANAGER' | 'MEMBER' | null;
