import { MainData, RegionItem } from '../../../api/ApiTypes';
import { setCookie } from '../../../utils/Cookie';
import { RegionContextModel } from '../models/RegionContextModel';

export class RegionContextController {
  private static instance: RegionContextController;
  private model: RegionContextModel;

  private constructor() {
    this.model = new RegionContextModel();
  }

  static getInstance(): RegionContextController {
    if (
      !RegionContextController.instance ||
      RegionContextController.instance === null ||
      RegionContextController.instance === undefined
    ) {
      RegionContextController.instance = new RegionContextController();
    }
    return RegionContextController.instance;
  }

  // 메인 데이터 가져오기
  async getMainData(): Promise<MainData> {
    return await this.model.getMainData();
  }

  // 관심지역 데이터 가져오기
  getPreferRegionsList(): RegionItem[] {
    return this.model.getPreferRegionsList();
  }

  // 선택 지역 데이터 가져오기
  getSelectedRegion(): RegionItem {
    return this.model.getSelectedRegion();
  }

  // 선택 지역 데이터 설정하기
  setSelectedRegion(region: RegionItem): void {
    this.model.setSelectedRegion(region);
    // 쿠키에 저장
    setCookie('regionId', region.regionId.toString());
  }
}
