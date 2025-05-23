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

  /* 모임 상세 조회 */
  static async getClubDetail(clubId: number) {
    return await http.get(`/club/${clubId}`);
  }

  /* 모임 목록 조회 */
  static async getClubList(category?: string) {
    return await http.get(`/club/list`, {
      params: {
        category,
      },
    });
  }
}
