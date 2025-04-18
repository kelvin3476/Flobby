import { ChangeRegionData, MainData, RegionItem } from '../../../api/ApiTypes';
import Main from '../../../api/main/Main';

// 기획에서 설정한 메인 데이터 기본 지역
export const DEFAULT_REGION: RegionItem = {
  regionId: 288,
  regionName: '서울 전체',
};

export class RegionContextModel {
  private initialized = false;

  // 메인데이터
  private mainData: MainData = {
    region: [],
    clubItems: [],
    onedayItems: [],
    boardItems: [],
  };

  // 원데이 & 동호회 데이터
  private changeRegionData: ChangeRegionData = {
    clubItems: [],
    onedayItems: [],
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
        this.selectedRegion = this.preferRegionsList[0]; // 선택된 지역 초기값 저장
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

  // 메인데이터 가져오기
  getMainData(): MainData {
    return this.mainData;
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

  // 지역 변경 API 호출
  async changeRegion(region: RegionItem): Promise<void> {
    try {
      const response = await Main.changeRegion(region.regionId.toString());
      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        this.changeRegionData = data;
      } else if (code === 1001) {
        // API 호출 실패
        throw new Error(message || '지역 변경에 실패하였습니다.');
      } else if (code === 1002) {
        // API 예외 발생
        throw new Error(message || '서버 오류가 발생했습니다.');
      }
    } catch (err: any) {
      console.log(err.message || '데이터 로드 실패');
    }
  }
}
