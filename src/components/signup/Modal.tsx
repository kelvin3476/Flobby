import React from "react";
import useModalForm from "../../hooks/join/useModalForm";

import "../../styles/join/Modal.scss";

interface ModalProps {
  onAgree: () => void;
}

const Modal: React.FC<ModalProps> = ({ onAgree }) => {
  const { isOpen, closeModal, modalType } = useModalForm();

  if (!isOpen || !modalType) return null;

  let modalTitle = "";
  let modalContent = null;

  switch (modalType) {
    case "service":
      modalTitle = "이용약관 동의";
      modalContent = (
        <>
          <div className="content1">
            <span>제1조 (목적)</span>
            <p>
              본 약관은 Flobby(이하 "서비스"라 함)를 제공하는 [회사명](이하 "회사"라 함)과 서비스 이용자 간의 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정하는 것을 목적으로 합니다.
            </p>
          </div>
          <div className="content2">
            <span>제2조 (정의)</span>
            <p>
            "서비스"란 회사가 운영하는 플랫폼인 Flobby를 통해 제공하는 취미 모임, 소규모 모임, 커뮤니티 등 관련 제반 서비스를 의미합니다. 
            <br /> "회원"이란 본 약관에 따라 서비스에 가입하여 회사가 제공하는 서비스를 이용하는 자를 말합니다. 
            <br /> "비회원"이란 회원가입 없이 서비스를 이용하는 자를 말합니다. 
            <br /> "모임"이란 Flobby를 통해 개설된 소규모, 대규모 또는 단발성 취미 활동을 위한 모임을 의미합니다.
            </p>
          </div>
          <div className="content3">
            <span>제3조 (약관의 효력 및 변경)</span>
            <p>
            본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.
            <br /> 회사는 필요 시 관련 법령을 위반하지 않는 범위 내에서 약관을 개정할 수 있습니다.
            약관이 변경될 경우 회사는 변경사항을 시행 7일 전부터 공지하며, 중요한 사항에 대한 변경은 30
            </p>
          </div>
        </>
      );
      break;
    case "privacy":
      modalTitle = "이용약관 동의";
      modalContent = (
        <>
          <div className="content1">
            <span>제1조 (목적)</span>
            <p>
              본 약관은 Flobby(이하 "서비스"라 함)를 제공하는 [회사명](이하 "회사"라 함)과 서비스 이용자 간의 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정하는 것을 목적으로 합니다.
            </p>
          </div>
          <div className="content2">
            <span>제2조 (정의)</span>
            <p>
            "서비스"란 회사가 운영하는 플랫폼인 Flobby를 통해 제공하는 취미 모임, 소규모 모임, 커뮤니티 등 관련 제반 서비스를 의미합니다. 
            <br /> "회원"이란 본 약관에 따라 서비스에 가입하여 회사가 제공하는 서비스를 이용하는 자를 말합니다. 
            <br /> "비회원"이란 회원가입 없이 서비스를 이용하는 자를 말합니다. 
            <br /> "모임"이란 Flobby를 통해 개설된 소규모, 대규모 또는 단발성 취미 활동을 위한 모임을 의미합니다.
            </p>
          </div>
          <div className="content3">
            <span>제3조 (약관의 효력 및 변경)</span>
            <p>
            본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.
            <br /> 회사는 필요 시 관련 법령을 위반하지 않는 범위 내에서 약관을 개정할 수 있습니다.
            약관이 변경될 경우 회사는 변경사항을 시행 7일 전부터 공지하며, 중요한 사항에 대한 변경은 30
            </p>
          </div>
        </>
      );
      break;
    case "marketing":
      modalTitle = "이용약관 동의";
      modalContent = (
        <>
          <div className="content1">
            <span>제1조 (목적)</span>
            <p>
              본 약관은 Flobby(이하 "서비스"라 함)를 제공하는 [회사명](이하 "회사"라 함)과 서비스 이용자 간의 권리, 의무 및 책임사항, 이용조건 및 절차 등 기본적인 사항을 규정하는 것을 목적으로 합니다.
            </p>
          </div>
          <div className="content2">
            <span>제2조 (정의)</span>
            <p>
            "서비스"란 회사가 운영하는 플랫폼인 Flobby를 통해 제공하는 취미 모임, 소규모 모임, 커뮤니티 등 관련 제반 서비스를 의미합니다. 
            <br /> "회원"이란 본 약관에 따라 서비스에 가입하여 회사가 제공하는 서비스를 이용하는 자를 말합니다. 
            <br /> "비회원"이란 회원가입 없이 서비스를 이용하는 자를 말합니다. 
            <br /> "모임"이란 Flobby를 통해 개설된 소규모, 대규모 또는 단발성 취미 활동을 위한 모임을 의미합니다.
            </p>
          </div>
          <div className="content3">
            <span>제3조 (약관의 효력 및 변경)</span>
            <p>
            본 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.
            <br /> 회사는 필요 시 관련 법령을 위반하지 않는 범위 내에서 약관을 개정할 수 있습니다.
            약관이 변경될 경우 회사는 변경사항을 시행 7일 전부터 공지하며, 중요한 사항에 대한 변경은 30
            </p>
          </div>
        </>
      );
      break;
    default:
      break;
  }

  return (
    <div className="modal-back" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <span>{modalTitle}</span>
          <button className="modal-close-btn" onClick={closeModal}></button>
        </div>
        <hr />
        <div className="modal-content">{modalContent}</div>
      </div>
      <button className="agree-btn" onClick={onAgree}>
        동의하기
      </button>
    </div>
  );
};

export default Modal;