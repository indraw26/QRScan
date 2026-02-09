import { useState } from "react";
import { Moon, Palette, Bell, Shield, Download, RotateCcw } from "lucide-react";

interface SettingToggleProps {
  icon: typeof Moon;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

const SettingToggle = ({ icon: Icon, label, description, enabled, onToggle }: SettingToggleProps) => (
  <div className="glass-card flex items-center gap-3 !p-3">
    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-foreground" strokeWidth={1.5} />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-foreground">{label}</p>
      <p className="text-[10px] text-muted-foreground">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 ${enabled ? "bg-primary" : "bg-border"
        }`}
    >
      <div
        className={`absolute top-[3px] w-4 h-4 rounded-full bg-card shadow-sm transition-transform duration-200 ${enabled ? "translate-x-[22px]" : "translate-x-[3px]"
          }`}
      />
    </button>
  </div>
);

const SettingsPanel = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [highRes, setHighRes] = useState(false);

  return (
    <div className="px-5 space-y-2 animate-fade-in">
      <SettingToggle
        icon={Moon}
        label="Dark Mode"
        description="Toggle dark appearance"
        enabled={darkMode}
        onToggle={() => setDarkMode(!darkMode)}
      />

      <SettingToggle
        icon={Bell}
        label="Notifications"
        description="QR scan alerts"
        enabled={notifications}
        onToggle={() => setNotifications(!notifications)}
      />

      <SettingToggle
        icon={Download}
        label="Auto Save to History"
        description="Save all scans automatically"
        enabled={autoSave}
        onToggle={() => setAutoSave(!autoSave)}
      />

      <SettingToggle
        icon={Palette}
        label="High Resolution Export"
        description="1024×1024 PNG export"
        enabled={highRes}
        onToggle={() => setHighRes(!highRes)}
      />

      {/* Danger zone */}
      <div className="pt-3">
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider mb-2 px-1">
          Data
        </p>
        <div className="space-y-2">
          <button className="glass-card flex items-center gap-3 !p-3 w-full hover:bg-surface-hover transition-colors">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
              <Shield className="w-4 h-4 text-foreground" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-medium text-foreground">Export Data</p>
              <p className="text-[10px] text-muted-foreground">Download your history as JSON</p>
            </div>
          </button>

          <button className="glass-card flex items-center gap-3 !p-3 w-full hover:bg-destructive/5 transition-colors group">
            <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center">
              <RotateCcw className="w-4 h-4 text-destructive" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-medium text-destructive">Clear All Data</p>
              <p className="text-[10px] text-muted-foreground">Remove history and settings</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
