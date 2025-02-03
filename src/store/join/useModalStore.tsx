import { create } from "zustand";

interface ModalStore {
  /* 모달 open 여부 */
  isOpen: boolean;

  /* 모달 열기 */
  openModal: (type: "service" | "privacy" | "marketing") => void;

  /* 모달 닫기 */
  closeModal: () => void;

  // modalType =
}

const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,

  openModal: (type) => set({isOpen: true}),

  closeModal: () => set({isOpen: false}),

  type: null,
}));

export default useModalStore;