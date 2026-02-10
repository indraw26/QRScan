import { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Download, Check, QrCode } from "lucide-react";
import Button from "@/commons/Button";
import { useTheme } from "@/contexts/ThemeContext";

const QRCodeGenerator = () => {
  const { theme } = useTheme();
  const [inputText, setInputText] = useState("");
  const [qrText, setQrText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!inputText.trim()) return;
    setQrText(inputText);
  }, [inputText]);

  const handleCopy = useCallback(() => {
    if (!qrText) return;
    navigator.clipboard.writeText(qrText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [qrText]);

  const handleDownload = useCallback(() => {
    if (!qrText) return;
    const svg = document.querySelector(".qr-display svg") as SVGElement;
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = 512;
      canvas.height = 512;
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 512, 512);
        ctx.drawImage(img, 0, 0, 512, 512);
      }
      const a = document.createElement("a");
      a.download = "qrcode.png";
      a.href = canvas.toDataURL("image/png");
      a.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  }, [qrText]);

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* QR Preview */}
      <div className="flex justify-center pt-2">
        <div className="qr-display">
          {qrText ? (
            <div className="animate-scale-in">
              <QRCodeSVG
                value={qrText}
                size={180}
                level="M"
                bgColor="transparent"
                fgColor={theme === "dark" ? "hsl(220, 25%, 90%)" : "hsl(220, 25%, 10%)"}
              />
            </div>
          ) : (
            <div className="w-[180px] h-[180px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="3" height="3" />
                    <rect x="18" y="14" width="3" height="3" />
                    <rect x="14" y="18" width="3" height="3" />
                    <rect x="18" y="18" width="3" height="3" />
                  </svg>
                </div>
                <p className="text-xs text-muted-foreground">Enter text and click Generate</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="px-5">
        <label className="text-xs font-medium text-muted-foreground mb-2 block">
          Content
        </label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter URL, text, or any content..."
          className="w-full h-24 px-4 py-3 rounded-xl border border-input bg-surface text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
        />
      </div>

      {/* Generate Button */}
      {!qrText && (
        <div className="px-5">
          <Button
            onClick={handleGenerate}
            disabled={!inputText.trim()}
            variant="primary"
            icon={QrCode}
            fullWidth
            className="animate-fade-in disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate QR Code
          </Button>
        </div>
      )}

      {/* Actions - only show when QR is generated */}
      {qrText && (
        <div className="flex gap-3 px-5">
          <Button
            onClick={handleCopy}
            variant="secondary"
            icon={copied ? Check : Copy}
            className="animate-stagger-1"
          >
            {copied ? "Copied!" : "Copy Text"}
          </Button>
          <Button
            onClick={handleDownload}
            variant="primary"
            icon={Download}
            className="animate-stagger-2"
          >
            Download
          </Button>
        </div>
      )}

      {/* Regenerate button when text changes */}
      {qrText && inputText !== qrText && inputText.trim() && (
        <div className="px-5">
          <Button
            onClick={handleGenerate}
            variant="outline"
            icon={QrCode}
            fullWidth
            className="animate-fade-in"
          >
            Regenerate QR Code
          </Button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;

