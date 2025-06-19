import React, { useState } from "react";

import Button from "../button/Button";

import "../../styles/modal/ClubSelectModal.scss";

interface ClubSelectModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const LEAVE_OPTIONS = [
  "모임이 잘 맞지 않아요.",
  "모임 시간이 안 맞거나 거리가 멀어요.",
  "개인 사정으로 참여할 수 없게 되었어요.",
  "다른 모임에 가입했어요.",
  "모임 운영이 제대로 되지 않아요.",
  "직접 입력할게요.",
];

const ClubSelectModal = ({ title, onClose, onSubmit }: ClubSelectModalProps) => {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string>("");
  const [err, setErr] = useState("");

  const handleLeaveSubmit = () => {
    if (!selected) {
      setErr("탈퇴 사유를 선택해 주세요.");
      return;
    }

    setErr("");
    onSubmit(selected === "직접 입력할게요." ? text.trim() : selected);
  };

  return (
    <div className="select-modal-back">
      <div className="select-modal-container">
        <div className="select-modal-wrapper">
          <div className="select-modal-up">
            <div className="select-modal-title">{title}</div>
            <ul className="long-radio">
              {LEAVE_OPTIONS.map((item, idx) => (
                <li key={idx}>
                  <label 
                    className="radio-label"
                    onClick={() => {
                      if (selected === item) {
                        setSelected("");
                        if (item === "직접 입력할게요.") setText("");
                      }
                    }}
                  >
                    <input 
                      type="radio" 
                      name="option"
                      value={item}
                      checked={selected === item}
                      onChange={() => {
                        setSelected(item);
                        setErr("");
                      }}
                    />
                    {item}
                  </label>
                  {item === "직접 입력할게요." && selected === item && (
                    <textarea 
                      className="radio-text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="모임을 탈퇴하려는 이유를 알려주세요!" 
                    />
                  )}
                </li>
              ))}
            </ul>
            {err && <span className="leave-error">{err}</span>}
          </div>
          <div className="select-modal-buttons">
            <Button 
              className="select-modal-cancel-btn"
              title="닫기"
              onClick={onClose}
            />
            <Button 
              className="select-modal-leave-btn"
              title="탈퇴"
              onClick={handleLeaveSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubSelectModal;