import { MainData, RegionItem } from '../../../api/ApiTypes';
import Main from '../../../api/main/Main';
import { getCookie, setCookie } from '../../../utils/Cookie';
import logger from '../../../utils/Logger';

// 비로그인 & 로그인 + 관심 지역 미설정시, 메인 데이터의 기준 지역값
export const DEFAULT_REGION: RegionItem = {
  regionId: 288,
  regionName: '서울 전체',
};

export class RegionContextModel {
  // 메인데이터
  mainData: MainData = {
    region: null,
    clubItems: [],
    onedayItems: [],
    boardItems: [],
    selectedRegion: DEFAULT_REGION,
  };

  // 관심 지역 & 선택 지역
  preferRegionsList: RegionItem[] = [];
  selectedRegion: RegionItem = DEFAULT_REGION;

  // 메인데이터 호출시 선택 지역 & 관심 지역 저장
  handleSelectedRegion = data => {
    // 관심 지역 저장
    if (data.region) {
      this.preferRegionsList = data.region;

      localStorage.setItem('preferRegionsList', JSON.stringify(data.region));
      logger.log('handleSelectedRegion', this.preferRegionsList);
    }

    // 쿠키 값 확인
    const cookie = getCookie('regionId');

    if (cookie) {
      this.selectedRegion = data.selectedRegion;
    } else {
      // 초기 진입시 selectedRegion은 로그인 유저일 경우 관심지역의 첫번째 값, 비로그인 유저의 경우 selectedRegion으로 넘어오는 defaultRegion(서울 전체)값으로 설정
      this.selectedRegion = this.preferRegionsList[0] || data.selectedRegion;
    }

    // 메인데이터 호출시 selectedRegion의 region 정보를 쿠키에 저장
    // (쿠키에 들어있는 regionId로 백에서 지역 필터링해서 넘겨주기 때문에)
    setCookie('regionId', this.selectedRegion.regionId.toString());
    setCookie('regionName', this.selectedRegion.regionName.toString());

    logger.log(
      'handleSelectedRegion',
      this.selectedRegion.regionId.toString(),
      this.selectedRegion.regionName.toString(),
      this.preferRegionsList,
    );
  };

  // 쿠키값으로 선택지역 초기화하는 코드
  initFromCookie(): void {
    const regionIdInCookie = getCookie('regionId');
    const regionNameInCookie = getCookie('regionName');
    const preferRegionList = localStorage.getItem('preferRegionsList');

    if (regionIdInCookie && regionNameInCookie) {
      const regionId = Number(regionIdInCookie);
      const regionName = decodeURIComponent(regionNameInCookie);
      logger.log('initFromCookie', regionId, regionName);

      this.selectedRegion = { regionId: regionId, regionName: regionName };
    }

    if (preferRegionList) this.preferRegionsList = JSON.parse(preferRegionList);
    logger.log('initFromCookie', JSON.parse(preferRegionList));
  }

  // 데이터 초기화
  async getMainData(): Promise<MainData> {
    try {
      const response = await Main.getMainData();

      const { code, message, data } = response.data;

      if (code === 1000) {
        // API 호출 성공
        this.mainData = data;
        this.handleSelectedRegion(data);

        return this.mainData;
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

  // 관심지역 데이터 가져오기
  getPreferRegionsList(): RegionItem[] {
    return this.preferRegionsList;
  }

  // 관심지역 데이터 가져오기
  setPreferRegionsList(regionList: RegionItem[]): void {
    this.preferRegionsList = regionList;
  }

  // 선택 지역 데이터 가져오기
  getSelectedRegion(): RegionItem {
    return this.selectedRegion;
  }

  // 선택 지역 데이터 설정하기
  setSelectedRegion(region: RegionItem): void {
    this.selectedRegion = region;
  }
}
