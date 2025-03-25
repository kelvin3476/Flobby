import { create } from "zustand";

interface ProgressStore {
  step: string;
  setStep: (step: string) => void;
}

const useProgressStore = create<ProgressStore>((set) => ({
  step: "step-agreement",
  setStep: (step) => set(() => ({ step })),
}));

export default useProgressStore;