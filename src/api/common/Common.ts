import { http } from '@/utils/Http';
import { GetHeaderInfoResponse } from '@/api/ApiTypes';

export default class Common {
  /* 헤더 조회 */
  static async getHeaderInfo(): GetHeaderInfoResponse {
    return await http.get('/header');
  }
}