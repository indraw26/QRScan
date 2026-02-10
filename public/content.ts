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
  const results = [];
  const images = document.querySelectorAll('img');
  
  for (const img of images) {
    try {
      const qrData = await decodeQRFromImage(img);
      if (qrData) {
        results.push({
          content: qrData,
          source: img.src,
          alt: img.alt || 'QR Code'
        });
      }
    } catch (error) {
      // Skip images that can't be processed
      console.debug('Failed to process image:', error);
    }
  }
  
  return results;
}

async function decodeQRFromImage(img) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Wait for image to load if not already loaded
    if (!img.complete) {
      img.onload = () => processImage();
      img.onerror = () => resolve(null);
    } else {
      processImage();
    }
    
    function processImage() {
      try {
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        
        if (canvas.width === 0 || canvas.height === 0) {
          resolve(null);
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });
        
        resolve(code ? code.data : null);
      } catch (error) {
        resolve(null);
      }
    }
  });
}
