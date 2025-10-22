import { http } from '@/utils/Http';

export default class Common {
  /* 헤더 조회 */
  static async getHeaderInfo() {
    return await http.get('/header');
  }
}