import { create } from "zustand";

interface RegionStore {
  selectedRegions: string[];
  activeCity: string | null;
  maxSelection: number;
  warning: boolean;
  setActiveCity: (city: string | null) => void;
  attemptSelectRegion: (region: string) => void;
  removeRegion: (region: string) => void;
  setWarning: (value: boolean) => void;
}

const useRegionStore = create<RegionStore>((set) => ({
  selectedRegions: [],
  activeCity: "서울",
  maxSelection: 3,
  warning: false,
  setActiveCity: (city) => set({ activeCity: city }),
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
  setWarning: (value) => set({ warning: value }),
}));

export default useRegionStore;
