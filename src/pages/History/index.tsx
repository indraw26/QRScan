import HistoryList from "./components/HistoryList";

const History = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="extension-header">
        <h1 className="text-sm font-semibold text-foreground">History</h1>
        <span className="text-[10px] text-muted-foreground font-medium px-2 py-1 rounded-full bg-muted animate-scale-in">
          4 items
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-3 animate-slide-up">
        <HistoryList />
      </div>
    </div>
  );
};

export default History;
