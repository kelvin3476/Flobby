import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../styles/tab/Tab.scss";

interface TabProps {
  tabs: { label: string; path: string }[];
}

const Tab = ({ tabs }: TabProps) => {
  const nav = useNavigate();
  const [activeTab, setActiveTap] = useState<string>("홈");

  return (
    <div className="tab-container">
      <div className="tab-btns">
        <span 
          className={`tab-btn ${activeTab === "홈" ? "active" : ""}`}
          onClick={() => setActiveTap("홈")}
        >홈</span>

        {tabs.map(({label, path}) => (
          <span
            key={path}
            className={`tab-btn ${activeTab === label ? "active" : ""}`}
            onClick={() => {
              nav(path);
              setActiveTap(label);
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tab;