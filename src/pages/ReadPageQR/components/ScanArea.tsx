import { useState } from "react";
import { ScanLine, Camera, CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/commons/Button";

type ScanState = "idle" | "scanning" | "done";

const ScanArea = () => {
  const [scanState, setScanState] = useState<ScanState>("idle");

  const handleScan = () => {
    if (scanState === "scanning") return;
    setScanState("scanning");
    setTimeout(() => setScanState("done"), 3000);
  };

  const handleReset = () => setScanState("idle");

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
              ? "Scan Complete"
              : "Read Page QR Code"}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[260px]">
          {scanState === "scanning"
            ? "Analyzing page content for QR codes. Please wait..."
            : scanState === "done"
              ? "No QR codes were found on this page."
              : "Scan QR codes found on the current web page. The extension will detect and decode them automatically."}
        </p>
      </div>

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

