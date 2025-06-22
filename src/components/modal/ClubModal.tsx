import React from "react";
import Button from "../button/Button";

import "../../styles/modal/ClubModal.scss";

interface ClubModalProps {
  mainMessage: string;
  subMessage?: string;
  showIcon?: boolean;
  iconType?: 'check' | 'warn';
  showCancelButton?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ClubModal = ({ 
  mainMessage,
  subMessage,
  showIcon,
  iconType,
  showCancelButton,
  confirmText = "확인",
  cancelText = "취소",
  onConfirm, 
  onCancel,
}: ClubModalProps) => {

  return (
    <div className="club-modal-back">
      <div className={`club-modal-container ${!showCancelButton ? "single" : ""}`}>
        <div className="modal-wrapper">
          <div className="modal-up">
            {showIcon && (
              <img 
                className="modal-icon"
                src={
                  iconType === 'check'
                    ? "../../../img/modal/modal-checked.png" 
                    : "../../../img/modal/modal-warn.png"
                }/>)}
            <div className="modal-main-message">{mainMessage}</div>
            {subMessage && <div className="modal-sub-message">{subMessage}</div>}
          </div>
          <div className="modal-buttons">
            {showCancelButton && (
              <Button className="modal-cancel-btn" title={cancelText} onClick={onCancel}/>
            )}
            <Button className="modal-confirm-btn" title={confirmText} onClick={onConfirm}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubModal;