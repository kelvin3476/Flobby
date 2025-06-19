import React from "react";
import Button from "../button/Button";

import "../../styles/modal/ClubModal.scss";

interface ClubModalProps {
  message: string;
  showIcon?: boolean;
  iconType?: 'check' | 'warn';
  showCancelButton?: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ClubModal = ({ 
  message, 
  showIcon,
  iconType,
  showCancelButton,
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
            <div className="modal-message">{message}</div>
          </div>
          <div className="modal-buttons">
            {showCancelButton && (
              <Button className="modal-cancel-btn" title="취소" onClick={onCancel}/>
            )}
            <Button className="modal-confirm-btn" title="확인" onClick={onConfirm}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubModal;