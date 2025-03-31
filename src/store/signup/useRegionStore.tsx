import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RegionStore {
  selectedRegions: string[];

  activeCity: string | null;
  setActiveCity: (city: string | null) => void;

  maxSelection: number;

  warning: boolean;
  setWarning: (value: boolean) => void;

  attemptSelectRegion: (region: string) => void;

  removeRegion: (region: string) => void;

  getRegions: () => string[];

  cityDistrictMap: Record<string, string[]>; 
  setCityDistrictMap: (data: Record<string, string[]>) => void; 
}

const useRegionStore = create<RegionStore>()(
  persist(
    (set, get) => ({
      selectedRegions: [],

      activeCity: "서울",
      setActiveCity: (city) => set({ activeCity: city }),

      maxSelection: 3,

      warning: false,
      setWarning: (value) => set({ warning: value }),

      attemptSelectRegion: (region) =>
        set((state) => {
          if (state.selectedRegions.includes(region)) {
            return {
              selectedRegions: state.selectedRegions.filter((item) => item !== region),
              warning: false,
            };
          }
          if (state.selectedRegions.length < state.maxSelection) {
            return {
              selectedRegions: [...state.selectedRegions, region],
              warning: false,
            };
          }
          return { warning: true };
        }),

      removeRegion: (region) =>
        set((state) => ({
          selectedRegions: state.selectedRegions.filter((item) => item !== region),
          warning: false,
        })),

      getRegions: () => get().selectedRegions,

      cityDistrictMap: {},
      setCityDistrictMap: (data) => set({cityDistrictMap: data}),
    }),
    {
      name: "region-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useRegionStore;
