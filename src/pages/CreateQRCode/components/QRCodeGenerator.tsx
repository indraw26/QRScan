import { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Download, Check } from "lucide-react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleDownload = useCallback(() => {
    if (!text) return;
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
  }, [text]);

  return (
    <div className="flex flex-col gap-5 animate-fade-in">
      {/* QR Preview */}
      <div className="flex justify-center pt-2">
        <div className="qr-display">
          {text ? (
            <QRCodeSVG
              value={text}
              size={180}
              level="M"
              bgColor="transparent"
              fgColor="hsl(220, 25%, 10%)"
            />
          ) : (
            <div className="w-[180px] h-[180px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-muted flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="3" height="3" />
                    <rect x="18" y="14" width="3" height="3" />
                    <rect x="14" y="18" width="3" height="3" />
                    <rect x="18" y="18" width="3" height="3" />
                  </svg>
                </div>
                <p className="text-xs text-muted-foreground">Enter text to generate</p>
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter URL, text, or any content..."
          className="w-full h-24 px-4 py-3 rounded-xl border border-input bg-surface text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring/30 transition-all"
        />
      </div>

      {/* Actions */}
      {text && (
        <div className="flex gap-3 px-5 animate-fade-in">
          <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-secondary text-secondary-foreground text-sm font-medium hover:bg-surface-hover transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Text"}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-primary text-primary-foreground text-sm font-medium glow-button hover:opacity-90 transition-all"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
