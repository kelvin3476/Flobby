import React from "react";

import "../../styles/tab/Tab.scss";

interface TabItem {
  label: string;
  key: string;
}

interface TabProps {
  tabs: TabItem[];
  currentTab: string;
  onTabChange: (key: string) => void;
}

const Tab = ({ tabs, currentTab, onTabChange }: TabProps) => {

  return (
    <div className="tab-container">
      <div className="tab-btns">
        {tabs.map(({ label, key }) => (
          <span
            key={key}
            className={`tab-btn ${currentTab === key ? "active" : ""}`}
            onClick={() => onTabChange(key)}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tab;