interface DetailInfo {
  role: string,
  isMember: boolean,
  clubName: string,
  location: string,
  currentMembers: number,
  maxMembers: number,
  clubImage: string,
  subCategory: string
}

export const DetailInfoData = {
  role: "leader",
  isMember: true,
  clubName: "축구를 사랑하는 송파구",
  location: "송파구",
  currentMembers: 3,
  maxMembers: 10,
  clubImage: "http://localhost:5173/img/main/club/thumbnail1.png",
  subCategory: "축구"
};