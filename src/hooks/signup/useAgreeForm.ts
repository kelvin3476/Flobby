import React from "react";
import useAgreeStore from "@/store/signup/useAgreeStore";

import { useNavigate } from "react-router-dom";

const useAgreeForm = () => {
  const {
    allAgree,
    setAllAgree,
    serviceAgree,
    setServiceAgree,
    privacyAgree,
    setPrivacyAgree,
    marketingAgree,
    setMarketingAgree,
    getAgreements,
  } = useAgreeStore();

  const nav = useNavigate();

  const handleAllAgree = () => {
    setAllAgree(!allAgree);
  };

  const handleServiceAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServiceAgree(e.target.checked)
  };

  const handlePrivacyAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyAgree(e.target.checked)
  };

  const handleMarketingAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketingAgree(e.target.checked)
  };

  const acceptAgree = () => {
    if (serviceAgree && privacyAgree) {
      nav('/signup/user-info', { state: getAgreements() });
    }
  };

  return {
    allAgree,
    setAllAgree,
    serviceAgree,
    setServiceAgree,
    privacyAgree,
    setPrivacyAgree,
    marketingAgree,
    setMarketingAgree,
    handleAllAgree,
    handleServiceAgree,
    handlePrivacyAgree,
    handleMarketingAgree,
    acceptAgree,
  };
};

export default useAgreeForm;