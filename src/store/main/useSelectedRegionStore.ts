import { create } from 'zustand';
import { RegionItem } from '../../api/ApiTypes';

interface SelectedRegionStore {
  selectedRegion: RegionItem | null;
  setSelectedRegion: (region: RegionItem) => void;
}

const preferRegions = [
  { regionName: '송파구', regionId: 195 },
  { regionName: '구로구', regionId: 203 },
  { regionName: '용산구', regionId: 216 },
]; // 관심지역 test용 초기값

const useSelectedRegionStore = create<SelectedRegionStore>()(set => ({
  // TODO: 로그인 : 초기값 지역 변경 api 호출 필요 / 비로그인 : 서울 전체(백에서 지역 리스트 api 수정 예정)
  selectedRegion: preferRegions[0], // TODO: 서버에는 지역 코드값만 넘겨드리기
  setSelectedRegion: region => set({ selectedRegion: region }),
}));

export default useSelectedRegionStore;
