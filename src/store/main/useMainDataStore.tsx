import { create } from 'zustand';

import { MainData } from '@/api/ApiTypes';
import { DEFAULT_REGION } from "@/services/region/models/ModalRegionListModel";

interface MainDataStore {
    mainDataList: MainData; /* 메인 api 전체 데이터 */
    setMainDataList: (data: MainData) => void; /* 메인 api 전체 데이터 setter */
}

const useMainDataStore = create<MainDataStore>(set => ({
  mainDataList: {
    clubItems: [], /* 모임 아이템 리스트 */
    onedayItems: [], /* 원데이 아이템 리스트 */
    boardItems: [], /* 실시간 인기 게시글 아이템 리스트 */
    region: [], /* 관심 지역 리스트 */
    selectedRegion: DEFAULT_REGION, /* 선택된 지역 아이템 */
  },
  setMainDataList: (data: MainData) => set({ mainDataList: data }),
}));

export default useMainDataStore;