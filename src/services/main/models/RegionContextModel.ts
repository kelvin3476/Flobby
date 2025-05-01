import { MainData, RegionItem } from '../../../api/ApiTypes';
import Main from '../../../api/main/Main';
import { getCookie } from '../../../utils/Cookie';

// 메인 데이터 기본 지역
export const DEFAULT_REGION: RegionItem = {
  regionId: 288,
  regionName: '서울 전체',
};

export class RegionContextModel {
  private initialized = false;

  // 메인데이터
  private mainData: MainData = {
    region: null,
    clubItems: [],
    onedayItems: [],
    boardItems: [],
    selectedRegion: DEFAULT_REGION,
  };

  // 관심 지역 & 선택 지역
  private preferRegionsList: RegionItem[] = [];
  private selectedRegion: RegionItem = DEFAULT_REGION;

  // 데이터 초기화
  async init(): Promise<void> {
    if (this.initialized) return;

    try {
      const response = await Main.getMainData();

      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        this.mainData = data; // 메인 데이터 저장
        this.preferRegionsList = data.region; // 관심 지역 저장

        const cookie = getCookie('regionId');

        if (cookie) {
          this.selectedRegion = data.selectedRegion;
        } else {
          this.selectedRegion = this.preferRegionsList[0] || DEFAULT_REGION;
        }

        this.initialized = true;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '메인 데이터를 가져오지 못했습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.log(err.message || '데이터 로드 실패');
    }
  }

  // 메인 api 호출하기
  async getMainData(): Promise<MainData | null> {
    try {
      const response = await Main.getMainData();
      const { code, message, data } = response.data;

      if (code === 1000) {
        this.mainData = data;
        return this.mainData;
      } else {
        throw new Error(message || '메인 데이터를 가져오지 못했습니다.');
      }
    } catch (err: any) {
      console.log(err.message || '메인 데이터 API 호출 실패');
      return null;
    }
  }

  // 관심지역 데이터 가져오기
  getPreferRegionsList(): RegionItem[] {
    return this.preferRegionsList;
  }

  // 선택 지역 데이터 가져오기
  getSelectedRegion(): RegionItem {
    return this.selectedRegion;
  }

  // 선택 지역 데이터 설정하기
  setSelectedRegion(regionList: RegionItem): void {
    this.selectedRegion = regionList;
  }
}
