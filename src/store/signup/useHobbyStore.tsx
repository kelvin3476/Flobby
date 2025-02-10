import { create } from 'zustand';

interface HobbyStore {
  selectedHobbies: string[];
  hobbyCount: number;
  addHobby: (hobby: string) => void;
  removeHobby: (hobby: string) => void;
}

const useHobbyStore = create<HobbyStore>(set => ({
  selectedHobbies: [],
  hobbyCount: 0,
  addHobby: hobby => set(state => {
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
}));

export default useHobbyStore;
