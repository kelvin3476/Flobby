import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface HobbyStore {
  selectedHobbies: string[];
  hobbyCount: number;
  hideHobbyList: number[];
  addHobby: (hobby: string) => void;
  removeHobby: (hobby: string) => void;
  setHideHobbyList: (index: number) => void;

  warning: boolean;
  setWarning: (value: boolean) => void;
}

const useHobbyStore = create<HobbyStore>()(
  persist(
    (set, get) => ({
      selectedHobbies: [],
      hobbyCount: 0,
      hideHobbyList: [],
      addHobby: hobby =>
        set(state => {
          // hobbyCount가 3 이상이면 추가하지 않음
          if (state.hobbyCount >= 3 || state.selectedHobbies.includes(hobby)) {
            return state;
          }
          return {
            selectedHobbies: [...state.selectedHobbies, hobby],
            hobbyCount: state.hobbyCount + 1, // hobbyCount 증가
          };
        }),
      removeHobby: hobby =>
        set(state => {
          const updatedHobbies = state.selectedHobbies.filter(
            item => item !== hobby,
          );
          return {
            selectedHobbies: updatedHobbies,
            hobbyCount: state.hobbyCount - 1,
          };
        }),
      setHideHobbyList: index =>
        set(state => {
          if (state.hideHobbyList.includes(index)) {
            return {
              hideHobbyList: state.hideHobbyList.filter(prev => prev != index),
            };
          }
          return {
            hideHobbyList: [...state.hideHobbyList, index],
          };
        }),
        
      warning: false,
      setWarning: (value) => set({ warning: value }),
    }),
    {
      name: 'hobby-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useHobbyStore;
