import ProfileCard from "./components/ProfileCard";

const AboutMe = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="extension-header">
        <h1 className="text-sm font-semibold text-foreground">About</h1>
        <span className="text-[10px] text-muted-foreground animate-fade-in">v1.0.0</span>
      </div>
      <div className="flex-1 overflow-y-auto py-3 animate-slide-up">
        <ProfileCard />
      </div>
    </div>
  );
};

export default AboutMe;
