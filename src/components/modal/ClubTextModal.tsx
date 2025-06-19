import React, { useState } from "react";
import Button from "../button/Button";

import "../../styles/modal/ClubTextModal.scss";

interface ClubTextModalProps {
  type: "greeting" | "report";
  title: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const ClubTextModal = ({ type, title, onClose, onSubmit }: ClubTextModalProps) => {
  const [text, setText] = useState('');
  const [textCount, setTextCount] = useState(0);
  const [isTextValid, setIsTextValid] = useState(true);
  const [err, setErr] = useState('');

  const getPlaceholder = () => {
    if (type === "greeting") 
      return "가입하신 계기 또는 간단한 자기소개를 적어주세요!";
    if (type === "report")
      return "부적절한 내용, 거짓 정보, 광고 등 신고하고 싶은 이유를 작성해 주세요.";
    return "";
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setTextCount(e.target.value.length);

    if (e.target.value.length > 200) {
      setIsTextValid(false);
      setErr(type === "greeting" ? "가입 인사는 최대 200자까지 작성할 수 있어요." : "신고 사유는 최대 200자까지 작성할 수 있어요.");
    } else {
      setIsTextValid(true);
      setErr("");
    }
  };

  const handleTextModalSubmit = () => {
    let isErr = false;

    if (text.trim() === "") {
      setIsTextValid(false);
      setErr(type === "greeting" ? "가입 인사를 작성해 주세요." : "신고 사유를 작성해 주세요.");
      isErr = true;
    } else {
      setIsTextValid(true);
      setErr("");
    }

    if(isErr) return;

    onSubmit(text.trim());
  };

  return (
    <div className="text-modal-back">
      <div className="text-modal-container">
        <div className="text-modal-wrapper">
          <div className="text-modal-up">
            <div className="text-modal-title">{title}</div>
            <div className="text-area">
              <textarea 
                name="" 
                placeholder={getPlaceholder()}
                className="text-textarea"
                maxLength={200}
                value={text}
                onChange={handleTextChange}
              />
              <div className="text-count">{`(${textCount}/200자)`}</div>
            </div>
            {!isTextValid && <span className="text-modal-err">{err}</span>}
          </div>
          <div className="text-modal-buttons">
            <Button className="text-modal-cancel-btn" title={type === "greeting" ? "닫기" : "취소"} onClick={onClose}/>
            <Button className="text-modal-submit-btn" title={type === "greeting" ? "가입" : "신고"} onClick={handleTextModalSubmit}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubTextModal;