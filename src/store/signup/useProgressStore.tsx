import { create } from "zustand";

interface ProgressStore {
  step: string;
  setStep: (step: string) => void;
}

const useProgressStore = create<ProgressStore>((set) => ({
  step: "",
  setStep: (step) => set(() => ({ step })),
}));

export default useProgressStore;