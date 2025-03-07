import { create } from "zustand";

interface ProgressStore {
  step: string;
  setStep: (step: string) => void;
  
  totalSteps: number;
}

const useProgressStore = create<ProgressStore>((set) => ({
  step: "agreeement",
  setStep: (step) => set(() => ({ step })),
  
  totalSteps: 5,

}));

export default useProgressStore;