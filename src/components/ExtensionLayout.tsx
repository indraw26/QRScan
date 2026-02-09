import { type ReactNode } from "react";
import { TabBar, type TabId } from "./TabBar";

interface ExtensionLayoutProps {
  children: ReactNode;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const ExtensionLayout = ({ children, activeTab, onTabChange }: ExtensionLayoutProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50 p-4">
      <div className="extension-container">
        <div className="extension-content">
          {children}
        </div>
        <TabBar activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </div>
  );
};

export default ExtensionLayout;