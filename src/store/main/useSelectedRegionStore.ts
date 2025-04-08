import { create } from 'zustand';

interface SelectedRegionStore {
  selectedRegion: string | null;
  setSelectedRegion: (region: string) => void;
}

const selectedRegions = ['송파구', '구로구', '용산구']; // test용 초기값

const useSelectedRegionStore = create<SelectedRegionStore>()(set => ({
  // TODO: 로그인 : 초기값 유저 정보 api 호출 필요 / 비로그인 : 서울 전체(백에서 api 수정 예정)
  selectedRegion: selectedRegions[0],
  setSelectedRegion: region => set({ selectedRegion: region }),
}));

export default useSelectedRegionStore;
