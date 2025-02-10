import React from "react";
import useModalForm from "../../hooks/join/useModalForm";
import ModalContents from "../../components/modal/ModalContents";
import { ModalTitles } from "../../components/modal/ModalContents";

import "../../styles/join/Modal.scss";

interface ModalProps {
  onAgree: () => void;
}

const Modal: React.FC<ModalProps> = ({ onAgree }) => {
  const { isOpen, closeModal, modalType } = useModalForm();

  if (!isOpen || !modalType) return null;

  return (
    <div className="modal-back" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-title">
          <span>{ModalTitles[modalType]}</span>
          <button className="modal-close-btn" onClick={closeModal}></button>
        </div>
        <hr />
        <div className="modal-content">{ModalContents[modalType]}</div>
      </div>
      <button className="agree-btn" onClick={onAgree}>
        동의하기
      </button>
    </div>
  );
};

export default Modal;