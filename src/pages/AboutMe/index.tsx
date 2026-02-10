import ProfileCard from "./components/ProfileCard";

const AboutMe = () => {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="extension-header relative z-10">
        <h1 className="text-sm font-semibold text-foreground">About</h1>
        <span className="text-[10px] text-muted-foreground animate-fade-in">v1.0.0</span>
      </div>
      <div className="flex-1 overflow-y-auto py-3 animate-slide-up relative z-10 scrollbar-hide">
        <ProfileCard />
      </div>
    </div>
  );
};

export default AboutMe;
