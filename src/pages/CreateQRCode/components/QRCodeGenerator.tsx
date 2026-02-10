import { useState, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, QrCode } from "lucide-react";
import Button from "@/commons/Button";

const QRCodeGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [qrText, setQrText] = useState("");

  const handleGenerate = useCallback(() => {
    if (!inputText.trim()) return;
    setQrText(inputText);
  }, [inputText]);



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
                bgColor="#ffffff"
                fgColor="#000000"
              />
            </div>
          ) : (
            <div className="w-[180px] h-[180px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-1 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <img
                    src="/qr-icon.svg"
                    alt="QR Icon"
                    className="w-8 h-8 opacity-70 dark:opacity-100 dark:invert dark:brightness-0 dark:contrast-200"
                  />
                </div>
                <p className="text-xs text-foreground/60 dark:text-white">Enter text and click Generate</p>
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
          className="w-full h-24 px-4 py-3 rounded-xl border border-input bg-surface text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none transition-all"
          style={{
            '--tw-ring-color': 'var(--color-primary)',
            '--tw-ring-opacity': '0.3'
          } as React.CSSProperties}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--color-primary, rgb(59 130 246 / 0.3))';
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = '';
          }}
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
            onClick={handleGenerate}
            variant="secondary"
            icon={QrCode}
            className="animate-stagger-1"
            disabled={!inputText.trim()}
          >
            Regenerate QR Code
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

    </div>
  );
};

export default QRCodeGenerator;

