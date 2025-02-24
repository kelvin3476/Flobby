import { create } from "zustand";

interface ProgressStore {
  step: number;
  setStep: (step: number) => void;
  
  progressWidth: number;
  totalSteps: number;
  nextStep: () => void;
}

const getProgressWidth = (step: number) => {
  switch(step) {
    case 1:
      return 384;
    case 2:
      return 768;
    case 3:
      return 1152;
    case 4:
      return 1536;
    case 5:
      return 1920;
  }
};

const useProgressStore = create<ProgressStore>((set) => ({
  step: 1,
  setStep: (step) => set(() => ({
    step,
    progressWidth: getProgressWidth(step),
  })),
  
  progressWidth: 384,
  
  totalSteps: 5,
  
  nextStep: () => set((state) => {
    const nextStep = Math.min(state.step + 1, state.totalSteps);

    return {
      step: nextStep,
      progressWidth: getProgressWidth(nextStep),
    };
  }),
  
}));

export default useProgressStore;