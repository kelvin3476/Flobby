import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface RegionArray {
  regionName: string;
  regionId: number;
}

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

  cityDistrictMap: Record<string, RegionArray[]>; 
  setCityDistrictMap: (data: Record<string, RegionArray[]>) => void; 
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

      getRegions: () => {
        const { selectedRegions, cityDistrictMap } = get();
        const regionIds: string[] = [];

        for (const regionName of selectedRegions) {
          const [city, ...districtParts] = regionName.split(" ");
          const districtName = districtParts.join(" ");
          const match = cityDistrictMap[city]?.find(
            (r) => r.regionName === districtName
          );
          if (match) {
            regionIds.push(match.regionId.toString());
          }
        }

        return regionIds;
      },

      cityDistrictMap: {},
      setCityDistrictMap: (data) => {
        const { selectedRegions } = get();
        const regionNames: string[] = [];
      
        for (const city in data) {
          for (const id of selectedRegions) {
            const match = data[city]?.find((r) => r.regionId.toString() === id);
            if (match) {
              regionNames.push(`${city} ${match.regionName}`);
            }
          }
        }
      
        set({
          cityDistrictMap: data,
          selectedRegions: regionNames,
        });
      }
      
    }),
    {
      name: "region-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => {
        const { selectedRegions, cityDistrictMap } = state;
        const regionIds: string[] = [];

        for (const regionName of selectedRegions) {
          const [city, ...districtParts] = regionName.split(" ");
          const districtName = districtParts.join(" ");
          const match = cityDistrictMap[city]?.find(
            (r) => r.regionName === districtName
          );
          if (match) {
            regionIds.push(match.regionId.toString());
          }
        }

        return {
          ...state,
          selectedRegions: regionIds, 
        };
      },

      merge: (persistedState: any, currentState) => {
        return {
          ...currentState,
          ...persistedState,
          selectedRegions: persistedState.selectedRegions,
        };
      }
      
    }
  )
);

export default useRegionStore;