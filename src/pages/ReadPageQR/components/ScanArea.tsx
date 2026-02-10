import { useState } from "react";
import { ScanLine, Camera, CheckCircle2, Loader2, Copy, Check } from "lucide-react";
import Button from "@/commons/Button";
import { useHistory } from "@/contexts/HistoryContext";

type ScanState = "idle" | "scanning" | "done";

interface QRResult {
  content: string;
  source: string;
  alt: string;
}

const ScanArea = () => {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [qrResults, setQrResults] = useState<QRResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { addToHistory } = useHistory();

  const handleScan = async () => {
    if (scanState === "scanning") return;
    setScanState("scanning");
    setQrResults([]);

    try {
      // Get the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      if (!tab.id) {
        setScanState("done");
        return;
      }

      // Send message to content script to scan the page
      const results = await chrome.tabs.sendMessage(tab.id, { action: 'scanPage' });

      setQrResults(results || []);

      // Add to history if auto-save is enabled
      if (results && results.length > 0) {
        results.forEach((result: QRResult) => {
          addToHistory(result.content, "scanned");
        });
      }

      setScanState("done");
    } catch (error) {
      console.error("Scan error:", error);
      setScanState("done");
    }
  };

  const handleReset = () => {
    setScanState("idle");
    setQrResults([]);
    setCopiedIndex(null);
  };

  const handleCopy = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in px-5">
      {/* Scan visualization */}
      <div className="relative w-56 h-56 mt-4">
        {/* Corner markers */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : scanState === "done" ? "border-primary" : "border-primary"}`} />
        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : "border-primary"}`} />
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : "border-primary"}`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : "border-primary"}`} />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {scanState === "done" ? (
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="w-10 h-10 text-primary" strokeWidth={1.5} />
            </div>
          ) : scanState === "scanning" ? (
            <div className="w-20 h-20 rounded-2xl bg-primary/5 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin" strokeWidth={1.5} />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
              <Camera className="w-10 h-10 text-muted-foreground" strokeWidth={1.2} />
            </div>
          )}
        </div>

        {/* Scanning line animation — only visible while scanning */}
        {scanState === "scanning" && (
          <div className="absolute inset-x-4 top-4 bottom-4 overflow-hidden rounded-lg">
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
            {/* Glow trail */}
            <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-primary/10 to-transparent animate-scan-line" />
          </div>
        )}

        {/* Corner pulse rings while scanning */}
        {scanState === "scanning" && (
          <>
            <div className="absolute -inset-2 rounded-2xl border border-primary/20 animate-ping-slow" />
            <div className="absolute -inset-4 rounded-3xl border border-primary/10 animate-ping-slower" />
          </>
        )}
      </div>

      {/* Info text */}
      <div className="text-center space-y-2">
        <h2 className="text-base font-semibold text-foreground">
          {scanState === "scanning"
            ? "Scanning Page..."
            : scanState === "done"
              ? qrResults.length > 0 ? `Found ${qrResults.length} QR Code${qrResults.length > 1 ? 's' : ''}` : "Scan Complete"
              : "Read Page QR Code"}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[260px]">
          {scanState === "scanning"
            ? "Analyzing page content for QR codes. Please wait..."
            : scanState === "done" && qrResults.length === 0
              ? "No QR codes were found on this page."
              : scanState === "done"
                ? "Click on any code below to copy its content."
                : "Scan QR codes found on the current web page. The extension will detect and decode them automatically."}
        </p>
      </div>

      {/* QR Results List */}
      {scanState === "done" && qrResults.length > 0 && (
        <div className="w-full max-w-[320px] space-y-2 animate-fade-in">
          {qrResults.map((result, index) => (
            <div
              key={index}
              className="glass-card flex items-center gap-3 group hover:scale-[1.01] transition-all"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-500">
                <ScanLine className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {result.content}
                </p>
                <p className="text-[10px] text-muted-foreground truncate">
                  {result.alt}
                </p>
              </div>
              <button
                onClick={() => handleCopy(result.content, index)}
                className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-primary/10 transition-colors cursor-pointer"
              >
                {copiedIndex === index ? (
                  <Check className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-primary/70 hover:text-primary" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Scan / Reset button */}
      {scanState === "done" ? (
        <Button
          onClick={handleReset}
          variant="secondary"
          icon={ScanLine}
          fullWidth
          className="max-w-[280px] h-12 animate-fade-in"
        >
          Scan Again
        </Button>
      ) : (
        <Button
          onClick={handleScan}
          disabled={scanState === "scanning"}
          variant="primary"
          icon={scanState === "scanning" ? Loader2 : ScanLine}
          isLoading={scanState === "scanning"}
          fullWidth
          className="max-w-[280px] h-12 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {scanState === "scanning" ? "Scanning..." : "Scan Current Page"}
        </Button>
      )}

      {/* Progress bar while scanning */}
      {scanState === "scanning" && (
        <div className="w-full max-w-[280px] h-1 rounded-full bg-muted overflow-hidden animate-fade-in">
          <div className="h-full bg-primary rounded-full animate-scan-progress" />
        </div>
      )}
    </div>
  );
};

export default ScanArea;

