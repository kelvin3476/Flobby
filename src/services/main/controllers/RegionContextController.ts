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
    if (!RegionContextController.instance) {
      RegionContextController.instance = new RegionContextController();
    }
    return RegionContextController.instance;
  }

  // 데이터 초기화
  async initialize(): Promise<void> {
    await this.model.init();
  }

  // 메인 데이터 가져오기
  async getMainData(): Promise<MainData | null> {
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
