import { http } from '@/utils/Http';

export default class Region {
  /* 지역 모달 관심 지역 리스트 및 선택 지역 불러오기 */
  static async getModalRegionList() {
    return await http.get('/region-list');
  }
}