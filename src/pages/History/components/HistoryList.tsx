import { Clock, ExternalLink, Trash2 } from "lucide-react";

interface HistoryItem {
  id: string;
  content: string;
  type: "created" | "scanned";
  timestamp: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    content: "https://github.com/user/repo",
    type: "created",
    timestamp: "2 min ago",
  },
  {
    id: "2",
    content: "https://example.com/product/12345",
    type: "scanned",
    timestamp: "15 min ago",
  },
  {
    id: "3",
    content: "Hello World - QR Test",
    type: "created",
    timestamp: "1 hour ago",
  },
  {
    id: "4",
    content: "https://docs.lovable.dev",
    type: "scanned",
    timestamp: "3 hours ago",
  },
];

const HistoryList = () => {
  return (
    <div className="px-5 animate-fade-in">
      {mockHistory.length === 0 ? (
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
          {mockHistory.map((item) => (
            <div
              key={item.id}
              className="glass-card flex items-center gap-3 group"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.type === "created" ? "bg-surface-active" : "bg-muted"
                }`}>
                {item.type === "created" ? (
                  <div className="w-3 h-3 rounded-sm bg-primary/70" />
                ) : (
                  <div className="w-3 h-3 rounded-full border-2 border-muted-foreground/40" />
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
                    {item.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {item.content.startsWith("http") && (
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-surface-hover transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                )}
                <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
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
