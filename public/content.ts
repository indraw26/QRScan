// Content script to scan page for QR codes
import jsQR from 'jsqr';

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanPage') {
    scanPageForQRCodes().then(sendResponse);
    return true; // Keep the message channel open for async response
  }
});

async function scanPageForQRCodes() {
  const results: any[] = [];
  const images = Array.from(document.querySelectorAll('img'));
  const canvases = Array.from(document.querySelectorAll('canvas'));
  
  // Process images
  for (const img of images) {
    try {
      // Skip small icons/tracking pixels
      if (img.width < 50 || img.height < 50) continue;

      const qrData = await decodeQRFromImage(img);
      if (qrData) {
        // Avoid duplicates
        if (!results.some(r => r.content === qrData)) {
          results.push({
            content: qrData,
            source: img.src,
            alt: img.alt || 'QR Code'
          });
        }
      }
    } catch (error) {
      // Quietly fail for individual images
    }
  }

  // Process canvases
  for (const canvas of canvases) {
    try {
      if (canvas.width < 50 || canvas.height < 50) continue;

      const qrData = decodeQRFromCanvas(canvas);
      if (qrData) {
        if (!results.some(r => r.content === qrData)) {
          results.push({
            content: qrData,
            source: canvas.toDataURL(), // Snapshot of the canvas
            alt: 'Canvas QR Code'
          });
        }
      }
    } catch (error) {
       // Quietly fail
    }
  }
  
  return results;
}

function decodeQRFromCanvas(sourceCanvas: HTMLCanvasElement): string | null {
  try {
    const ctx = sourceCanvas.getContext('2d');
    if (!ctx) return null;
    
    // Get image data directly from the canvas
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
    // Create a temporary image to handle loading/CORS properly without messing with the DOM element
    const tempImg = new Image();
    
    // Only set crossOrigin if it's not a data URL (though it doesn't hurt for data URLs)
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
          // Canvas tainted (CORS failure)
          resolve(null);
        }
      } catch {
        resolve(null);
      }
    };
    
    tempImg.onerror = () => resolve(null);
    
    // Trigger load
    tempImg.src = img.src;
    
    // Timeout if image takes too long
    setTimeout(() => resolve(null), 2000);
  });
}
