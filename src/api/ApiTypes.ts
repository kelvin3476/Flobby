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
  maxMember: number;
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
  clubItems: clubItem[];
  onedayItems: onedayItem[];
  boardItems: boardItem[];
}

/* -------------------- 지역 모달 관심 지역 리스트 및 선택 지역 api 타입 -------------------- */

/* 지역 모달 관심 지역 리스트 및 선택 지역 응답 데이터 타입 */
export interface ModalRegionListData {
  interestRegionList?: RegionItem[] | [];
  regionList: Record<string, RegionItem[]> | [];
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
  isNew: boolean;
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
export interface ClubMeetingData {
  clubMeetingTitle: string;
  clubMeetingDate: string;
  clubMeetingTime: string;
  clubMeetingLocation: string;
  maxParticipants: number;
  entryfee?: string;
}

export type ClubRoleType = 'LEADER' | 'MANAGER' | 'MEMBER' | null;

/* -------------------- 챌린지 검색 api 타입 -------------------- */

/* 챌린지 검색 api(default: 인기순) */
export interface getSearchChallengeResponse {
  challengeCount: number;
  challengeSearchList: ChallengeSearchItem[];
  challengePopularList: ChallengeSearchItem[];
}

export interface ChallengeItemType {
  challengeId: number;
  challengeName: string;
  mainCategory: string;
  subCategory: string;
  maxMembers: number;
  currentMembers: number;
  regionId: number;
  regionName: string;
  photoUrl: string;
  recruitEndDate: string;
  recruitDday: string;
  wishCount: number;
}

export interface ChallengeSearchItem {
  challengeId: number;
  challengeName: string;
  mainCategory: string;
  subCategory: string;
  maxMember: number;
  currentMember: number;
  regionId: number;
  regionName: string;
  photoUrl: string;
  recruitEndDate: string;
  recruitDday: string;
  wishCount: number;
  recruitFlag: boolean; // 모집중 버튼 flag
  createdAt: string;
}

export type challengeSortType = 'popular' | 'new' | 'deadline';

/* 인기 검색어 api */
export interface PopularKeywordData {
  keyword: string;
  searchCount: number;
  rank: number;
}

/* -------------------- 챌린지 상세 api 타입 -------------------- */

/* 챌린지 상세 프로필 썸네일 */
export interface GetChallengeRecruitThumnail {
  title: string; // 챌린지 명
  dDay: number; // 챌린지 시작 디데이(숫자만 반환)
  period: Date; // 챌린지 기간
  challengeRegion: string; // 챌린지 지역
  mainImage: string; // 챌린지 메인 이미지
  maxMembers: number; // 챌린지 최대 인원
  currentMembers: number; // 챌린지 현재 인원
  mainCategory: string; // 메인 카테고리
  subCategory: string; // 서브 카테고리
  challengeLiked:	boolean	// 챌린지 좋아요 여부
}

/* 챌린지 상세 설명 */
export interface GetChallengeRecruitDescription {
  description: string; // 챌린지 설명
  images: {
    imageUrl: string; // 챌린지 설명 글에 포함된 이미지
    orderNo: number; // 이미지 순서
  }[];
}

/* 챌린지 상세 qna */
export interface GetChallengeQnaResponse {
  questionId: number; // 질문 ID
  question: string; // 질문 내용
  memberId: number; // 질문 작성자 ID
  createdAt: Date; // 질문 등록일
  isMyQuestion: boolean; // 내가 작성한 질문인지 여부
  answer: {
    answerId: number; // 답변 ID
    answer: string; // 답변 내용
    memberId: number; // 답변 작성자 ID(챌린지장 ID)
    createdAt: Date; // 답변 등록일
  };
}

/* 챌린지 후기 조회 api */
export interface GetChallengeReviewResponse {
  profileImageUrl: string;	// 작성자 프로필 이미지 링크
  nickname:	string; // 작성자 닉네임
  seasonNumber:	number; // 챌린지 시즌
  description: string; // 후기 내용
  images: { // 후기 이미지 리스트
    detailRefId: number; // 후기 참조 Id
    imageUrl: string; // 후기 이미지 링크
    orderNo: number; // 후기 이미지 순서
  }[];
  likeCount: number; // 후기 좋아요 수
  liked: boolean; // 로그인 한 사용자의 후기 좋아요 여부
}

/* 챌린지 상세 추천 챌린지 */
export interface GetRecommendChallengesResponse {
  challengeId: number; // 챌린지 id
  challengeName: string; // 챌린지 이름
  mainCategory: string; // 챌린지 상위 카테고리
  subCategory: string; // 챌린지 하위 카테고리
  maxMember: number; // 챌린지 최대 인원
  currentMember: number; // 챌린지 현재 인원
  regionId: number; // 모임 지역 이름
  regionName: string; // 모임명
  mainPhotoUrl:	string;	// 모임 대표 사진 url(S3)
  recruitEndDate:	Date; // 모집 마감일
  recruitDday: string; // 모집 마감 D-Day(모집 D-2, 모집 D-Day, 모집 마감)
  wishCount: number; //	찜 수
  recruitFlag: boolean //	모집 마감 여부(true: 등록 가능, false: 등록 마감)
  createdAt: Date; // 챌린지 생성일
}

/* 챌린지 상세 조회 api */
export interface GetChallengeDetailResponse {
  /* TODO: 현 사용자가 챌린지장인지 아닌지에 대한 role 타입 추가 예정 */
  challengeId: number; // 챌린지 id
  isParticipated: boolean; // 현재 챌린지 참가 여부
  recruitThumnail: GetChallengeRecruitThumnail;
  recruitDescription: GetChallengeRecruitDescription;
  questions: GetChallengeQnaResponse[];
  reviews: GetChallengeReviewResponse[];
  recommendChallenges: GetRecommendChallengesResponse[];
}

/* -------------------- 마이페이지 api 타입 -------------------- */

/* 마이페이지 조회 api */
export interface GetMyInfoResponse {
  profilePhotoUrl: string;
  nickname: string;
  email: string;
  interestRegions: RegionItem[];
  interestCategory: string[];
}

/* 프로필 상세 조회 api */
export interface GetProfileDetailResponse {
  profileImageUrl: string;
  nickName: string;
  email: string;
  interestRegions: RegionItem[];
  interestCategorys: string[];
}

/* 프로필 상세 수정 json api */
export interface PatchProfileDetailJsonResponse {
  defaultImage?: boolean /* 기본이미지로 변경시 false로 전달 이미지 변경시 true로 전달 */;
  nickName?: string /* 닉네임(2~12자, 중복 불가) */;
  interestRegion?: number[] /* 관심지역ID 배열(최대 3개) */;
  interestCategory?: string[] /* 관심카테고리(최대 3개) */;
}

/* 프로필 상세 수정 api */
export interface PatchProfileDetailResponse
  extends PatchProfileDetailJsonResponse {
  file?: File /* 프로필 수정 이미지 (프로필 이미지 수정할 경우만) */;
  data?: PatchProfileDetailJsonResponse /* 프로필 수정 데이터 (수정 할 데이터가 있을때만) */;
}

/* -------------------- 공통 api 타입 -------------------- */
export interface GetHeaderInfoResponse {
  profilePhotoUrl: string
}