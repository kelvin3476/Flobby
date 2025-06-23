import React from "react";

import Header from "../../components/login/Header";
import LogoHeader from "../../components/header/LogoHeader";
import Button from "../../components/button/Button";
import Checkbox from "../../components/checkbox/Checkbox";
import AgreementModal from "../../components/signup/AgreementModal";
import ProgressBar from "../../components/signup/ProgressBar";

import useAgreeForm from "../../hooks/signup/useAgreeForm";
import useModalForm from "../../hooks/signup/useModalForm";

import "../../styles/signup/Agreement.scss";


const Agreement = () => {

  const { 
    modalType,
    openServiceModal,
    openPrivacyModal,
    openMarketingModal,
    closeModal,
  } = useModalForm();

  const {
    allAgree,
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
  } = useAgreeForm();

  const handleModalAgree = () => {
    if (modalType === "service") {
      setServiceAgree(true);
    } else if (modalType === "privacy") {
      setPrivacyAgree(true);
    } else if (modalType === "marketing") {
      setMarketingAgree(true);
    }
    closeModal();
  };

  return (
    <div className="agreement-container">
      <LogoHeader />
      <ProgressBar  />
      <div className="agreement-wrapper">
        <div className="agreement-title">
          <Header className="Header" headerTitle="Flobby 회원가입을 시작합니다."/>
          <span>
            Flobby 회원이 되면 취미 모임과 커뮤니티를 통해 <br/> 
            새로운 관심사를 발견하고 다양한 사람들과 교류할 수 있어요.
          </span>
        </div>

        <main>
          <div className="input-container">
            <div className="all-wrapper">
              <Checkbox
                checked={allAgree}
                onChange={handleAllAgree}
                typename="약관 모두 동의"
                withButton={false}
              />
            </div>
            
            <hr />   

            <div className="rest-wrapper">
              <Checkbox 
                checked={serviceAgree}
                onChange={handleServiceAgree}
                typename="[필수] 서비스 이용약관 동의"
                onClick={openServiceModal}
              />

              <Checkbox 
                checked={privacyAgree}
                onChange={handlePrivacyAgree}
                typename="[필수] 개인정보 수집 및 이용 동의"
                onClick={openPrivacyModal}
              />

              <Checkbox 
                checked={marketingAgree}
                onChange={handleMarketingAgree}
                typename="[선택] 광고성 정보 수신 동의"
                onClick={openMarketingModal}
              />
            </div>
          </div>
          <AgreementModal onAgree={handleModalAgree}/>
        </main>
        <Button 
            className={`join-next-btn ${serviceAgree && privacyAgree ? 'active' : ''}`} 
            title="다음" onClick={acceptAgree}
        />
      </div>
    </div>
  );
};

export default Agreement;