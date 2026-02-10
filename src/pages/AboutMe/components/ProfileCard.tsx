import { Globe, Heart, Github, Star, ExternalLink, Mail } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
  sublabel: string;
  delay: string;
}

const SocialLink = ({ href, icon: Icon, label, sublabel, delay }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`glass-card group flex items-center gap-3 p-3! hover:scale-[1.02] transition-all duration-300 ${delay}`}
  >
    <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors">
      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{label}</p>
      <p className="text-[10px] text-muted-foreground">{sublabel}</p>
    </div>
    <ExternalLink className="w-3 h-3 text-muted-foreground/50 group-hover:text-primary/50 transition-colors" />
  </a>
);

const ProfileCard = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center gap-6 px-5 pb-6 animate-fade-in">
      {/* Avatar Section */}
      <div className="relative mt-2 animate-scale-in group">
        <div className="absolute -inset-1 bg-linear-to-br from-primary via-primary/50 to-transparent rounded-full opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500" />
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-background to-muted p-1 border border-white/10 shadow-xl relative z-10">
          <img
            src="/icons/icon128.png"
            alt="QR Scan Logo"
            className="w-full h-full rounded-full object-cover p-2 bg-linear-to-br from-primary/10 to-transparent"
          />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-background border-2 border-background flex items-center justify-center shadow-lg z-20 animate-bounce-slow">
          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        </div>
      </div>

      {/* Info Section */}
      <div className="text-center space-y-2 animate-slide-up">
        <div>
          <h2 className="text-xl font-bold bg-linear-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            QR Scanner
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-medium text-primary border border-primary/20">
              v1.0.0
            </span>
            <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-[10px] font-medium text-green-600 border border-green-500/20">
              Stable
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px] mx-auto">
          The fastest way to scan and generate QR codes directly in your browser.
        </p>
      </div>

      {/* Social Links */}
      <div className="w-full max-w-[320px] space-y-3">
        <SocialLink
          href="https://github.com/indraw26/QRScan"
          icon={Github}
          label="Source Code"
          sublabel="Star us on GitHub"
          delay="animate-stagger-1"
        />
        <SocialLink
          href="https://indrawijaya.dev" // Placeholder
          icon={Globe}
          label="Developer Website"
          sublabel="See more projects"
          delay="animate-stagger-2"
        />
        <SocialLink
          href="mailto:contact@indrawijaya.dev"
          icon={Mail}
          label="Contact Support"
          sublabel="Report a bug or suggestion"
          delay="animate-stagger-3"
        />
      </div>

      {/* Rate Us Button */}
      <a
        href="#"
        className="w-full max-w-[320px] py-3 rounded-xl bg-linear-to-r from-primary to-primary/80 text-primary-foreground font-medium text-sm flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all animate-stagger-4"
      >
        <Star className="w-4 h-4 fill-primary-foreground/20" />
        Rate on Chrome Web Store
      </a>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-muted-foreground/60">
          &copy; {currentYear} Indra Wijaya. Open Source.
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
