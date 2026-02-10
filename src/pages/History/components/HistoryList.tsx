import { Clock, ExternalLink, Trash2, QrCode, ScanLine } from "lucide-react";
import { useHistory } from "@/contexts/HistoryContext";

const HistoryList = () => {
  const { historyItems, deleteItem } = useHistory();

  const formatTime = (timestamp: number) => {
    // ... existing formatTime code ...
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = (timestamp - Date.now()) / 1000 / 60; // difference in minutes
    if (Math.abs(diff) < 1) return "Just now";
    if (Math.abs(diff) < 60) return rtf.format(Math.round(diff), 'minute');
    if (Math.abs(diff) < 24 * 60) return rtf.format(Math.round(diff / 60), 'hour');
    return rtf.format(Math.round(diff / (24 * 60)), 'day');
  };

  return (
    <div className="px-5 animate-fade-in">
      {historyItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-3">
            <Clock className="w-7 h-7 text-muted-foreground" strokeWidth={1.2} />
          </div>
          <p className="text-sm font-medium text-foreground">No history yet</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your QR code activity will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {historyItems.map((item, index) => (
            <div
              key={item.id}
              className={`glass-card flex items-center gap-3 group hover:scale-[1.01] hover:shadow-md transition-all animate-fade-in`}
              style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'backwards' }}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${item.type === "created" ? "bg-primary/10 text-primary" : "bg-blue-500/10 text-blue-500"
                }`}>
                {item.type === "created" ? (
                  <QrCode className="w-4 h-4" />
                ) : (
                  <ScanLine className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {item.content}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-muted-foreground capitalize">
                    {item.type}
                  </span>
                  <span className="text-[10px] text-muted-foreground">·</span>
                  <span className="text-[10px] text-muted-foreground">
                    {formatTime(item.timestamp)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.content.startsWith("http") && (
                  <a
                    href={item.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-primary/70 hover:text-primary" />
                  </a>
                )}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5 text-destructive/70 hover:text-destructive" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryList;
