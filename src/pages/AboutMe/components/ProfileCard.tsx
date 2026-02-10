import { Globe, Heart, Github, CupSoda, QrCode } from "lucide-react";

const ProfileCard = () => {
  return (
    <div className="flex flex-col items-center gap-5 px-5 animate-fade-in">
      {/* Avatar */}
      <div className="relative mt-4 animate-scale-in">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center border border-primary/20">
          <span className="text-2xl font-bold text-primary"><QrCode /></span>
        </div>
        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center animate-pulse">
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
          className="glass-card flex items-center gap-3 !p-3 hover:bg-surface-hover hover:scale-[1.02] transition-all animate-stagger-1"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Github className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Source Code</p>
            <p className="text-[10px] text-muted-foreground">View on GitHub</p>
          </div>
        </a>

        <a
          href="#"
          className="glass-card flex items-center gap-3 !p-3 hover:bg-surface-hover hover:scale-[1.02] transition-all animate-stagger-3"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Website</p>
            <p className="text-[10px] text-muted-foreground">-</p>
          </div>
        </a>
      </div>

      {/* Footer */}
      <p className="text-[10px] text-muted-foreground flex items-center gap-1 pb-2">
        Made with <CupSoda className="w-3 h-3 text-primary" fill="currentColor" /> by Indra Wijaya
      </p>
    </div>
  );
};

export default ProfileCard;
