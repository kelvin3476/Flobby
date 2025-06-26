import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RegionArray {
  regionName: string;
  regionId: number;
}

interface RegionStore {
  selectedRegionNames: string[];
  selectedRegionIds: string[];

  activeCity: string | null;
  setActiveCity: (city: string | null) => void;

  maxSelection: number;

  warning: boolean;
  setWarning: (value: boolean) => void;

  attemptSelectRegionName: (regionName: string) => void;
  attemptSelectRegionId: (regionId: string) => void;

  removeRegion: (regionName: string) => void;

  cityDistrictMap: Record<string, RegionArray[]> | [];
  setCityDistrictMap: (data: Record<string, RegionArray[]> | []) => void;

  clearRegion: () => void;
}

const RegionValue = (
  state: RegionStore,
  key: "selectedRegionNames" | "selectedRegionIds",
  value: string
) => {
  const list = state[key];

  if(list.includes(value)) {
    return {
      [key]: list.filter((item) => item !== value),
      warning: false,
    };
  }

  if (list.length < state.maxSelection) {
    return {
      [key]: [...list, value],
      warning: false,
    };
  }

  return { warning: true };
};

const useRegionStore = create<RegionStore>()(
  persist(
    (set, get) => ({
      selectedRegionNames: [],
      selectedRegionIds: [],

      activeCity: "서울",
      setActiveCity: (city) => set({ activeCity: city }),

      maxSelection: 3,

      warning: false,
      setWarning: (value) => set({ warning: value }),

      attemptSelectRegionName: (regionName) =>
        set((state) => RegionValue(state, "selectedRegionNames", regionName)),

      attemptSelectRegionId: (regionId) =>
        set((state) => RegionValue(state, "selectedRegionIds", regionId)),

      removeRegion: (regionName) =>
        set((state) => {
          const index = state.selectedRegionNames.findIndex((item) => item === regionName);
          if(index === -1) return;

          return {
            selectedRegionNames: state.selectedRegionNames.filter((_, i) => i !== index),
            selectedRegionIds: state.selectedRegionIds.filter((_, i) => i !== index),
            warning: false,
          };
        }),

      cityDistrictMap: {},
      setCityDistrictMap: (data) => {
        const { selectedRegionNames } = get();
        const regionNames: string[] = [];
      
        for (const city in data) {
          for (const id of selectedRegionNames) {
            const match = data[city]?.find((r) => r.regionId.toString() === id);
            if (match) {
              regionNames.push(`${city} ${match.regionName}`);
            }
          }
        }
      
        set({
          cityDistrictMap: data,
          selectedRegionNames: regionNames,
        });
      },      
      clearRegion: () =>
        set({
          selectedRegionNames: [],
          selectedRegionIds: [],
          activeCity: "서울",
          warning: false,
          cityDistrictMap: {},
        })
    }),
    {
      name: "region-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRegionStore;