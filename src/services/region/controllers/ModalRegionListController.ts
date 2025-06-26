import { ModalRegionListModel } from '../models/ModalRegionListModel';
import { ModalRegionListData, RegionItem } from '../../../api/ApiTypes';
import { setCookie } from "../../../utils/Cookie";

export class ModalRegionListController {
  private static instance: ModalRegionListController;
  model: ModalRegionListModel;

  private constructor() {
    this.model = new ModalRegionListModel();
    // @ts-ignore
    window.$rlc = this;
  }

  static getInstance(): ModalRegionListController {
    if (
      !ModalRegionListController.instance ||
      ModalRegionListController.instance === null ||
      ModalRegionListController.instance === undefined
    ) {
      ModalRegionListController.instance = new ModalRegionListController();
    }
    return ModalRegionListController.instance;
  }

  /* 지역 모달 관심 지역 리스트, 선택 지역, 지역 리스트 데이터 불러오기 */
  async getModalRegionList(): Promise<ModalRegionListData> {
    return await this.model.getModalRegionList();
  }

  /* 관심 지역 데이터 가져 오기 */
  getInterestRegionList(): RegionItem[] {
    return this.model.getInterestRegionList();
  }

  /* 관심 지역 데이터 설정 하기 */
  setInterestRegionList(regionList: RegionItem[]): void {
    this.model.setInterestRegionList(regionList);
  }

  /* 선택 지역 데이터 가져 오기 */
  getSelectedRegion(): RegionItem {
    return this.model.getSelectedRegion();
  }

  /* 선택 지역 데이터 설정 하기 */
  setSelectedRegion(region: RegionItem): void {
    this.model.setSelectedRegion(region);

    // 쿠키에 저장
    setCookie('regionId', region.regionId.toString());
    setCookie('regionName', region.regionName);

    // 지역 변경 이벤트 전파
    window.dispatchEvent(new CustomEvent('regionChanged', { detail: region }));
  }
}
