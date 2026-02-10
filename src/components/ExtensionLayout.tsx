import { type ReactNode } from "react";
import { TabBar, type TabId } from "./TabBar";

interface ExtensionLayoutProps {
  children: ReactNode;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const ExtensionLayout = ({ children, activeTab, onTabChange }: ExtensionLayoutProps) => {
  return (
    <div className="extension-container">
      <div className="extension-content scrollbar-hide">
        {children}
      </div>
      <TabBar activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default ExtensionLayout;