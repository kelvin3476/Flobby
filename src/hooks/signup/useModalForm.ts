import React from "react";
import useModalStore from "../../store/signup/useModalStore";

const useModalForm = () => {
  const { isOpen, openModal, closeModal, modalType } = useModalStore();

  const openServiceModal = () => {
    openModal("service");
  };

  const openPrivacyModal = () => {
    openModal("privacy");
  };

  const openMarketingModal = () => {
    openModal("marketing");
  };

  return {
    isOpen,
    modalType,
    openModal,
    closeModal,
    openServiceModal,
    openPrivacyModal,
    openMarketingModal,
  };
};

export default useModalForm;