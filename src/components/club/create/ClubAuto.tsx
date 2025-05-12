import React from "react";
import Label from "./Label";

import "../../../styles/club/create/ClubAuto.scss";

const ClubAuto = () => {
  return (
    <div className="auto-container">
      <Label labelTitle="자동 승인 여부"/>
      <div className="select-wrapper">
        <label className="yes-label">
          <input type="radio" name="autoApproval" value="true" />
          Y
        </label>
        <label className="no-label">
          <input type="radio" name="autoApproval" value="false" defaultChecked />
          N
        </label>
      </div>
    </div>
  );
};

export default ClubAuto;