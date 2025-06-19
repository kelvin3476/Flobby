import { RegionItem } from '../../../api/ApiTypes';
import SignUp from '../../../api/signup/SignUp';

export class RegionListModel {
  private initialized = false;
  regionList: Record<string, RegionItem[]> = {};

  constructor() {
    // @ts-ignore
    window.$rlm = this;
  }

  async getRegionList(): Promise<Record<string, RegionItem[]>> {
    if (this.initialized) return this.regionList;

    try {
      const response = await SignUp.getRegionList();
      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        this.regionList = data;
        this.initialized = true;
        return this.regionList;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.log(err.message || '데이터 로드 실패');
    }
  }
}
