import { Twitter, Globe, Heart, Github } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center gap-5 px-5 animate-fade-in">
      {/* Avatar */}
      <div className="relative mt-4">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-border">
          <span className="text-2xl font-bold text-primary">QR</span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
          <Heart className="w-3 h-3 text-primary-foreground" fill="currentColor" />
        </div>
      </div>

      {/* Info */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-semibold text-foreground">QRScan Extension</h2>
        <p className="text-xs text-muted-foreground">Version 1.0.0</p>
      </div>

      <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-[280px]">
        A minimal, elegant browser extension to create and scan QR codes instantly. Built with love for simplicity.
      </p>

      {/* Links */}
      <div className="w-full max-w-[300px] space-y-2">
        <a
          href="#"
          className="glass-card flex items-center gap-3 !p-3 hover:bg-surface-hover"
        >
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Github className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Source Code</p>
            <p className="text-[10px] text-muted-foreground">View on GitHub</p>
          </div>
        </a>

        <a
          href="#"
          className="glass-card flex items-center gap-3 !p-3 hover:bg-surface-hover"
        >
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Twitter className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Follow Updates</p>
            <p className="text-[10px] text-muted-foreground">@qrscan_ext</p>
          </div>
        </a>

        <a
          href="#"
          className="glass-card flex items-center gap-3 !p-3 hover:bg-surface-hover"
        >
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
            <Globe className="w-4 h-4 text-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Website</p>
            <p className="text-[10px] text-muted-foreground">qrscan.dev</p>
          </div>
        </a>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-muted-foreground flex items-center gap-1 pb-2">
        Made with <Heart className="w-3 h-3 text-primary" fill="currentColor" /> by Developer
      </p>
    </div>
  );
};

export default ProfileCard;
