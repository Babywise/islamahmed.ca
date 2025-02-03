import "./TabContainer.css";

import type { FC, ReactNode } from "react";
import { useState } from "react";

interface Tab {
  content: ReactNode;
  id: string;
  label: string;
}

interface TabContainerProps {
  defaultActiveTab?: string;
  tabs: Tab[];
}

/**
 * A component that displays a set of tabs and their corresponding content.
 * @param TabContainerProps The component props.
 * @param TabContainerProps.tabs The tabs to display.
 * @param TabContainerProps.defaultActiveTab The ID of the tab to display initially.
 */
const TabContainer: FC<TabContainerProps> = ({ defaultActiveTab, tabs }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id);

  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabs.map(tab => (
          <button
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
            }}
            type="button">
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabContainer;
