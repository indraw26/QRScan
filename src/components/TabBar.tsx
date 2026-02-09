import { QrCode, ScanLine, Clock, User, Settings } from "lucide-react";

export type TabId = "create" | "read" | "history" | "about" | "settings";

interface Tab {
  id: TabId;
  label: string;
  icon: typeof QrCode;
}

const tabs: Tab[] = [
  { id: "create", label: "Create", icon: QrCode },
  { id: "read", label: "Scan", icon: ScanLine },
  { id: "history", label: "History", icon: Clock },
  { id: "about", label: "About", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
];

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export const TabBar = ({ activeTab, onTabChange }: TabBarProps) => {
  return (
    <div className="extension-tab-bar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`tab-item ${isActive ? "active" : ""}`}
          >
            <tab.icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-[10px] font-medium leading-none">{tab.label}</span>
            <div className="tab-indicator" />
          </button>
        );
      })}
    </div>
  );
};
