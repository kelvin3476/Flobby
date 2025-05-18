import { http } from '../../utils/Http';

export default class Main {
  /* 메인 페이지 (동호회, 원데이, 실시간 인기 게시글 데이터) 불러오기 */
  static async getMainData() {
    return await http.get(`/flobby/main`);
  }

  /* 모임 게시글 생성 */
  static async createClub(createClubData: FormData) {
    return await http.post(`/club/register`, createClubData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}
