import jsQR from 'jsqr';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanPage') {
    scanPageForQRCodes().then(sendResponse);
    return true;
  }
});

async function scanPageForQRCodes() {
  const results: any[] = [];
  const images = Array.from(document.querySelectorAll('img'));
  const canvases = Array.from(document.querySelectorAll('canvas'));
  
  for (const img of images) {
    try {
      if (img.width < 50 || img.height < 50) continue;

      const qrData = await decodeQRFromImage(img);
      if (qrData) {
        if (!results.some(r => r.content === qrData)) {
          results.push({
            content: qrData,
            source: img.src,
            alt: img.alt || 'QR Code'
          });
        }
      }
    } catch (error) {
    }
  }

  for (const canvas of canvases) {
    try {
      if (canvas.width < 50 || canvas.height < 50) continue;

      const qrData = decodeQRFromCanvas(canvas);
      if (qrData) {
        if (!results.some(r => r.content === qrData)) {
          results.push({
            content: qrData,
            source: canvas.toDataURL(),
            alt: 'Canvas QR Code'
          });
        }
      }
    } catch (error) {
    }
  }
  
  return results;
}

function decodeQRFromCanvas(sourceCanvas: HTMLCanvasElement): string | null {
  try {
    const ctx = sourceCanvas.getContext('2d');
    if (!ctx) return null;
    
    const imageData = ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert',
    });
    
    return code ? code.data : null;
  } catch (e) {
    return null;
  }
}

async function decodeQRFromImage(img: HTMLImageElement): Promise<string | null> {
  return new Promise((resolve) => {
    const tempImg = new Image();
    
    if (!img.src.startsWith('data:')) {
      tempImg.crossOrigin = "Anonymous";
    }
    
    tempImg.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(null); return; }

        canvas.width = tempImg.naturalWidth;
        canvas.height = tempImg.naturalHeight;
        
        if (canvas.width === 0 || canvas.height === 0) {
          resolve(null);
          return;
        }
        
        ctx.drawImage(tempImg, 0, 0);
        
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          resolve(code ? code.data : null);
        } catch {
          resolve(null);
        }
      } catch {
        resolve(null);
      }
    };
    
    tempImg.onerror = () => resolve(null);
    
    tempImg.src = img.src;
    
    setTimeout(() => resolve(null), 2000);
  });
}
