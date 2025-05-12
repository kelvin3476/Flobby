import React from "react";
import Label from "./Label";
import useClubCreateStore from "../../../store/club/useClubCreateStore";

import "../../../styles/club/create/ClubAuto.scss";

const ClubAuto: React.FC = () => {
  
  const {
    autoApprovalFlag,
    setAutoApprovalFlag,
  } = useClubCreateStore();

  return (
    <div className="auto-container">
      <Label labelTitle="자동 승인 여부"/>
      <div className="select-wrapper">
        <label className="yes-label">
          <input 
            type="radio" 
            name="autoApproval" 
            value="true"
            checked={autoApprovalFlag === true}
            onChange={() => setAutoApprovalFlag(true)}
          />
          Y
        </label>
        <label className="no-label">
          <input 
            type="radio" 
            name="autoApproval" 
            value="false" 
            checked={autoApprovalFlag === false}
            onChange={() => setAutoApprovalFlag(false)}
          />
          N
        </label>
      </div>
    </div>
  );
};

export default ClubAuto;