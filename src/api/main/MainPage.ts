import { http } from '../../utils/Http';

export default class MainPage {
  /* 지역 변경 */
  static async changeRegion(region: number) {
    return await http.get('/change/region', {
      params: { region },
    });
  }

  /* 메인 화면 */
  static async getMainData() {
    return await http.get('/flobby/main');
  }
}
