import { useState } from "react";
import { Moon, Download } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface SettingToggleProps {
  icon: typeof Moon;
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

const SettingToggle = ({ icon: Icon, label, description, enabled, onToggle }: SettingToggleProps) => (
  <div className="glass-card flex items-center gap-3 !p-3 hover:scale-[1.01] transition-all cursor-pointer" onClick={onToggle}>
    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${enabled ? "bg-primary/15" : "bg-primary/10"}`}>
      <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
    </div>
    <div className="flex-1">
      <p className="text-xs font-medium text-foreground">{label}</p>
      <p className="text-[10px] text-muted-foreground">{description}</p>
    </div>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="relative w-10 h-[22px] rounded-full transition-all duration-300 cursor-pointer shadow-md"
      style={{
        backgroundColor: enabled ? 'var(--color-primary)' : 'var(--color-muted)',
        boxShadow: enabled ? '0 8px 16px oklch(60% 0.18 220 / 0.3)' : 'none'
      }}
    >
      <div
        className="absolute top-[3px] w-4 h-4 rounded-full shadow-md transition-all duration-300"
        style={{
          backgroundColor: 'white',
          transform: enabled ? 'translateX(22px) scale(1.1)' : 'translateX(3px)'
        }}
      />
    </button>
  </div>
);

const SettingsPanel = () => {
  const { theme, toggleTheme } = useTheme();
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="px-5 space-y-2 animate-fade-in">
      <div className="animate-stagger-1">
        <SettingToggle
          icon={Moon}
          label="Dark Mode"
          description="Toggle dark appearance"
          enabled={theme === "dark"}
          onToggle={toggleTheme}
        />
      </div>

      <div className="animate-stagger-3">
        <SettingToggle
          icon={Download}
          label="Auto Save to History"
          description="Save all scans automatically"
          enabled={autoSave}
          onToggle={() => setAutoSave(!autoSave)}
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
