import ScanArea from "./components/ScanArea";
const ReadPageQR = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="extension-header">
        <h1 className="text-sm font-semibold text-foreground">Scan Page</h1>
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      </div>
      <div className="flex-1 overflow-y-auto py-4 animate-slide-up">
        <ScanArea />
      </div>
    </div>
  );
};

export default ReadPageQR;
