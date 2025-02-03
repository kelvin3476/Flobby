import React from "react";
import useModalStore from "../../store/join/useModalStore";

const useModalForm = () => {
  const {
    isOpen,
    openModal,
    closeModal,
  } = useModalStore();

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
    openModal,
    closeModal,
    openServiceModal,
    openPrivacyModal,
    openMarketingModal,
  };
};

export default useModalForm;