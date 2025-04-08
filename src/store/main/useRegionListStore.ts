import { create } from 'zustand';

interface RegionListStore {
  regionList: Record<string, string[]>;
  setRegionList: (data: Record<string, string[]>) => void;
}

const useRegionListStore = create<RegionListStore>(set => ({
  regionList: {},
  setRegionList: data => set({ regionList: data }),
}));

export default useRegionListStore;
