import { ModalRegionListData, RegionItem } from '../../../api/ApiTypes';
import Region from '../../../api/region/Region';
import { getCookie } from '../../../utils/Cookie';
import logger from '../../../utils/Logger';

// 비로그인 & 로그인 + 관심 지역 미설정시, 메인 데이터의 기준 지역값
export const DEFAULT_REGION: RegionItem = {
  regionId: 288,
  regionName: '서울 전체',
};

export class ModalRegionListModel {
  private initialized = false;
  modalRegionList: ModalRegionListData = {
    interestRegionList: [],
    regionList: [],
    selectedRegion: DEFAULT_REGION,
  };

  interestRegionList: RegionItem[] = [];
  regionList: Record<string, RegionItem[]>;
  selectedRegion: RegionItem = DEFAULT_REGION;

  constructor() {
    // @ts-ignore
    window.$rlm = this;
  }

  // 메인데이터 호출시 선택 지역 & 관심 지역 저장
  handleSelectedRegion = data => {
    // 관심 지역 저장
    if (data.interestRegionList) {
      this.interestRegionList = data.interestRegionList;

      logger.log('handleSelectedRegion', this.interestRegionList);
    }

    // 쿠키 값 확인
    const cookie = getCookie('regionId');

    if (cookie) {
      this.selectedRegion = data.selectedRegion;
    } else {
      // 초기 진입시 selectedRegion은 로그인 유저일 경우 관심지역의 첫번째 값, 비로그인 유저의 경우 selectedRegion으로 넘어오는 defaultRegion(서울 전체)값으로 설정
      this.selectedRegion = this.interestRegionList[0] || data.selectedRegion;
    }

    logger.log(
      'handleSelectedRegion',
      data.selectedRegion.regionId.toString(),
      this.interestRegionList,
    );
  };

  /* 지역 모달 관심 지역 리스트, 선택 지역, 지역 리스트 데이터 api 호출 */
  async getModalRegionList(): Promise<ModalRegionListData> {
    if (this.initialized) return this.modalRegionList;

    try {
      const response = await Region.getModalRegionList();
      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        logger.log('[지역 모달 데이터 가져오기 성공]', data);
        this.modalRegionList = data;
        logger.log('지역 모달 데이터', this.modalRegionList);
        this.handleSelectedRegion(data);
        this.initialized = true;
        return this.modalRegionList;
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

  /* 관심 지역 데이터 가져 오기 */
  getInterestRegionList(): RegionItem[] {
    return this.interestRegionList;
  }

  /* 관심 지역 데이터 설정 하기 */
  setInterestRegionList(regionList: RegionItem[]): void {
    this.interestRegionList = regionList;
  }

  /* 선택 지역 데이터 가져 오기 */
  getSelectedRegion(): RegionItem {
    return this.selectedRegion;
  }

  /* 선택 지역 데이터 설정 하기 */
  setSelectedRegion(region: RegionItem): void {
    this.selectedRegion = region;
  }
}
