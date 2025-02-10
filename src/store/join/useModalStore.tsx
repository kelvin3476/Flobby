import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  modalType: "service" | "privacy" | "marketing" | null;
  openModal: (type: "service" | "privacy" | "marketing") => void;
  closeModal: () => void;
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, modalType: null }),
}));

export default useModalStore;
