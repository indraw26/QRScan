import { useState } from "react";
import ExtensionLayout from "@/components/ExtensionLayout";
import { type TabId } from "@/components/TabBar";
import CreateQRCode from "@/pages/CreateQRCode";
import ReadPageQR from "@/pages/ReadPageQR";
import History from "@/pages/History";
import AboutMe from "@/pages/AboutMe";
import Settings from "@/pages/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabId>("read");

  const renderContent = () => {
    switch (activeTab) {
      case "create":
        return <CreateQRCode />;
      case "read":
        return <ReadPageQR />;
      case "history":
        return <History />;
      case "about":
        return <AboutMe />;
      case "settings":
        return <Settings />;
      default:
        return <CreateQRCode />;
    }
  };

  return (
    <ExtensionLayout activeTab={activeTab} onTabChange={setActiveTab}>
      <div key={activeTab} className="page-transition">
        {renderContent()}
      </div>
    </ExtensionLayout>
  );
};

export default Index;
