import { create } from 'zustand';
import { RegionItem } from '../../api/ApiTypes';

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
