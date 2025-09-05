import React from "react";

import "@/styles/club/text/RequiredText.scss";

const RequiredText = () => {
  return (
    <div className="required-container">
      <span>*</span>
      <div>필수 입력 사항</div>
    </div>
  );
};

export default RequiredText;