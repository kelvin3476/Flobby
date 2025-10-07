import { http } from '@/utils/Http';

export default class MyPage {
  /* 마이 페이지 정보 (프로필 사진, 닉네임, 이메일, 관심 지역, 관심 카테고리 데이터) 불러오기 */
  static async getMyInfo() {
    return await http.get(`/myInfo`);
  }
  /* 프로필 상세 정보 (프로필 사진, 닉네임, 이메일, 관심 지역, 관심 카테고리 데이터) 불러오기 */
  static async getProfileDetail() {
    return await http.get(`/profile`);
  }

  /* 프로필 상세 정보 수정 (프로필 사진, 닉네임, 이메일, 관심 지역, 관심 카테고리 데이터) 수정하기 */
  static async editProfileDetail(data: FormData) {
    return await http.patch(`/profile/edit`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
