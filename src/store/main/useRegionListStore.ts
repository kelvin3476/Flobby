import { create } from 'zustand';

interface RegionItem {
  regionName: string;
  regionId: number;
}

export type RegionList = Record<string, RegionItem[]>;

interface RegionListStore {
  regionList: RegionList;
  setRegionList: (data: RegionList) => void;
}

const useRegionListStore = create<RegionListStore>(set => ({
  regionList: {},
  setRegionList: data => set({ regionList: data }),
}));

export default useRegionListStore;
