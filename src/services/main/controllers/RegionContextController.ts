import { ChangeRegionData, MainData, RegionItem } from '../../../api/ApiTypes';
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

  // 메인데이터 가져오기
  getMainData(): MainData {
    return this.model.getMainData();
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
  setSelectedRegion(regionList: RegionItem): void {
    this.model.setSelectedRegion(regionList);
  }

  // 지역 변경 API 호출
  async changeRegion(region: RegionItem): Promise<void> {
    await this.model.changeRegion(region);
  }

  // 지역 변경 API를 통해 변경된 원데이 & 동호회 데이터 가져오기
  getChangeRegionData(): ChangeRegionData {
    return this.model.getChangeRegionData();
  }
}
