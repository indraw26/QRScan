import { useState, useEffect } from "react";
import { ScanLine, Camera, CheckCircle2, Loader2, Upload, ExternalLink, Copy, Check } from "lucide-react";
import jsQR from "jsqr";
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
  const [isDragging, setIsDragging] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { addToHistory } = useHistory();

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return string.startsWith('http://') || string.startsWith('https://') || string.startsWith('www.');
    }
  };

  const handleResultClick = async (content: string, index: number) => {
    if (isValidUrl(content)) {
      const url = content.startsWith('www.') ? `https://${content}` : content;
      window.open(url, '_blank');
    } else {
      try {
        await navigator.clipboard.writeText(content);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (error) {
        console.error("Copy failed:", error);
      }
    }
  };

  const handleReset = () => {
    setScanState("idle");
    setQrResults([]);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;

    setScanState("scanning");
    setQrResults([]);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          setScanState("done");
          return;
        }

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            const result: QRResult = {
              content: code.data,
              source: URL.createObjectURL(file),
              alt: file.name
            };
            setQrResults([result]);
            addToHistory(result.content, "scanned");
          } else {
            setQrResults([]);
          }
        } catch (error) {
          console.error("Scan error:", error);
        }
        setScanState("done");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Handle paste events
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        const file = e.clipboardData.files[0];
        if (file.type.startsWith('image/')) {
          processFile(file);
        }
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in px-5">
      {/* Scan visualization */}
      <div className="relative w-40 h-40 mt-4">
        {/* Corner markers */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : scanState === "done" ? "border-primary" : "border-primary"}`} />
        <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : "border-primary"}`} />
        <div className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : "border-primary"}`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-lg transition-colors duration-500 ${scanState === "scanning" ? "border-primary animate-pulse" : "border-primary"}`} />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          {scanState === "done" ? (
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
          ) : scanState === "scanning" ? (
            <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" strokeWidth={1.5} />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <Camera className="w-8 h-8 text-muted-foreground" strokeWidth={1.2} />
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
            ? "Decoding..."
            : scanState === "done"
              ? qrResults.length > 0 ? `Found ${qrResults.length} QR Code${qrResults.length > 1 ? 's' : ''}` : "Scan Complete"
              : "Scan QR Code"}
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed max-w-[260px]">
          {scanState === "scanning"
            ? "Processing image..."
            : scanState === "done" && qrResults.length === 0
              ? "No QR code found in the image."
              : scanState === "done"
                ? "Click on any code below to copy its content."
                : "Paste an image from clipboard (Ctrl+V) or drop an image file here to scan."}
        </p>
      </div>

      {/* File Upload / Drag & Drop Area */}
      {scanState === "idle" && (
        <div
          className={`w-full max-w-[280px] h-20 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <div className="flex flex-col items-center gap-1 text-muted-foreground">
            <Upload className="w-5 h-5" />
            <span className="text-xs">Drop image or click to upload</span>
          </div>
        </div>
      )}

      {/* QR Results List */}
      {scanState === "done" && qrResults.length > 0 && (
        <div className="w-full max-w-[320px] space-y-2 animate-fade-in">
          {qrResults.map((result, index) => (
            <div
              key={index}
              onClick={() => handleResultClick(result.content, index)}
              className="glass-card flex items-center gap-3 group hover:scale-[1.01] transition-all cursor-pointer hover:bg-muted/50"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-500">
                <ScanLine className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  {result.content}
                </p>
              </div>
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors"
                title={isValidUrl(result.content) ? "Open in new tab" : "Copy to clipboard"}
              >
                {copiedIndex === index ? (
                  <Check className="w-3.5 h-3.5 text-primary" />
                ) : isValidUrl(result.content) ? (
                  <ExternalLink className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-primary/70 group-hover:text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Scan / Reset button */}
      {scanState === "done" && (
        <Button
          onClick={handleReset}
          variant="secondary"
          icon={ScanLine}
          fullWidth
          className="max-w-[280px] h-10 animate-fade-in"
        >
          Scan Another Image
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

