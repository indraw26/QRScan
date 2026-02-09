import SettingsPanel from "./components/SettingsPanel";

const Settings = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="extension-header">
        <h1 className="text-sm font-semibold text-foreground">Settings</h1>
      </div>
      <div className="flex-1 overflow-y-auto py-3 animate-slide-up">
        <SettingsPanel />
      </div>
    </div>
  );
};

export default Settings;
