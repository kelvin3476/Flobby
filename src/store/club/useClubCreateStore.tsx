import { create } from "zustand";

interface ClubCreateStore {
  clubName: string;
  setClubName: (clubName: string) => void;

  description: string;
  setDescription: (description: string) => void;

  autoApprovalFlag: boolean;
  setAutoApprovalFlag: (autoApprovalFlag: boolean) => void;
}

const useClubCreateStore = create<ClubCreateStore>((set) => ({
  clubName: "",
  setClubName: (clubName: string) => set({ clubName }),

  description: "",
  setDescription: (description: string) => set({ description }),

  autoApprovalFlag: false,
  setAutoApprovalFlag: (autoApprovalFlag: boolean) => set({ autoApprovalFlag }),

}));

export default useClubCreateStore;