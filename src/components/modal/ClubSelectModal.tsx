import React, { useState, useEffect } from "react";

import Button from "../button/Button";

import Main from '../../api/main/Main';

import logger from '../../utils/Logger';

import "../../styles/modal/ClubSelectModal.scss";

interface ClubSelectModalProps {
  title: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

const ClubSelectModal = ({ title, onClose, onSubmit }: ClubSelectModalProps) => {
  const [leaveReasonList, setLeaveReasonList] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string>("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchLeaveClubReasonList = async () => {
      try {
        // 모임 탈퇴 사유 리스트를 불러오는 API 호출
        const response = await Main.getLeaveClubReasonList();
        const { code, data, message } = response.data;
        if (code === 1000) {
          setLeaveReasonList(data);
        } else {
          logger.log('모임 탈퇴 사유 리스트를 불러오는 데 실패:', message);
        }
      } catch (error) {
        logger.log('모임 탈퇴 사유 리스트를 불러오는 중 오류 발생:', error);
      }
    }

    fetchLeaveClubReasonList();
  }, []);

  const handleLeaveSubmit = () => {
    if (!selected) {
      setErr("탈퇴 사유를 선택해 주세요.");
      return;
    }

    setErr("");
    onSubmit(selected === "직접 입력할게요" ? text.trim() : selected);
  };

  return (
    <div className="select-modal-back">
      <div className="select-modal-container">
        <div className="select-modal-wrapper">
          <div className="select-modal-up">
            <div className="select-modal-title">{title}</div>
            <ul className="long-radio">
              {leaveReasonList.map((item, idx) => (
                <li key={idx}>
                  <label 
                    className="radio-label"
                    onClick={() => {
                      if (selected === item) {
                        setSelected("");
                        if (item === "직접 입력할게요") setText("");
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
                  {item === "직접 입력할게요" && selected === item && (
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