import { useState, useRef } from 'react'
import QRCode from 'qrcode'

const App = () => {
  const [text, setText] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generateQRCode = async () => {
    if (!text.trim()) {
      return
    }

    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, text, {
          width: 280,
          margin: 2,
          color: {
            dark: '#2563EB',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H'
        })

        // Convert canvas to data URL for download
        const dataUrl = canvasRef.current.toDataURL('image/png')
        setQrDataUrl(dataUrl)
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const handleTextChange = (value: string) => {
    setText(value)
    // Clear QR code when text changes
    if (qrDataUrl) {
      setQrDataUrl('')
    }
  }

  const downloadQRCode = () => {
    if (!qrDataUrl) return

    const link = document.createElement('a')
    const filename = text.length > 30
      ? `qrcode-${Date.now()}.png`
      : `qrcode-${text.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`

    link.download = filename
    link.href = qrDataUrl
    link.click()
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const clearText = () => {
    setText('')
    setQrDataUrl('')
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #DBEAFE 0%, #EFF6FF 50%, #FFFFFF 100%)',
      minHeight: '500px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {/* Header */}
      <div className="fade-in" style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          marginBottom: '8px',
          color: '#1E293B',
          letterSpacing: '-0.5px'
        }}>
          QR Scanner
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#475569',
          fontWeight: '500'
        }}>
          Generate & Download QR Codes
        </p>
      </div>

      {/* Input Section */}
      <div className="glass-card slide-in" style={{ padding: '20px' }}>
        <label style={{
          display: 'block',
          marginBottom: '10px',
          fontSize: '14px',
          fontWeight: '600',
          color: '#1E293B'
        }}>
          Enter Text or URL
        </label>

        <textarea
          className="input-field"
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          placeholder="Type or paste your text, URL, or link here..."
          rows={3}
          style={{
            resize: 'vertical',
            minHeight: '80px',
            fontFamily: 'inherit'
          }}
        />

        {/* Generate Button */}
        <button
          onClick={generateQRCode}
          disabled={!text.trim()}
          className="btn btn-primary"
          style={{
            width: '100%',
            marginTop: '16px',
            padding: '14px',
            fontSize: '16px',
            opacity: !text.trim() ? 0.5 : 1,
            cursor: !text.trim() ? 'not-allowed' : 'pointer'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Generate QR Code
        </button>

        {text && (
          <div style={{
            marginTop: '12px',
            display: 'flex',
            gap: '8px',
            alignItems: 'center'
          }}>
            {isValidUrl(text) && (
              <span style={{
                fontSize: '12px',
                color: '#2563EB',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Valid URL
              </span>
            )}

            <button
              onClick={copyToClipboard}
              className="btn btn-secondary"
              style={{
                marginLeft: 'auto',
                padding: '8px 16px',
                fontSize: '13px'
              }}
            >
              {copied ? (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Copy
                </>
              )}
            </button>

            <button
              onClick={clearText}
              className="btn btn-secondary"
              style={{
                padding: '8px 16px',
                fontSize: '13px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Hidden canvas for QR code generation */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* QR Code Display */}
      {qrDataUrl && (
        <div className="glass-card fade-in" style={{
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div className="qr-container">
            <img src={qrDataUrl} alt="QR Code" style={{ display: 'block', width: '280px', height: '280px' }} />
          </div>

          <button
            onClick={downloadQRCode}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px',
              fontSize: '16px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download QR Code
          </button>

          <p style={{
            fontSize: '12px',
            color: '#64748B',
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            {text.length > 50 ? text.substring(0, 50) + '...' : text}
          </p>
        </div>
      )}

      {/* Empty State */}
      {!text && (
        <div className="glass-card fade-in" style={{
          padding: '40px 24px',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            margin: '0 auto 16px',
            background: '#DBEAFE',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#1E293B',
            marginBottom: '8px'
          }}>
            Start Creating
          </h3>

          <p style={{
            fontSize: '14px',
            color: '#475569',
            lineHeight: '1.6'
          }}>
            Enter text or URL above, then click<br />"Generate QR Code" button
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        fontSize: '12px',
        color: '#64748B',
        marginTop: 'auto',
        paddingTop: '12px'
      }}>
        Made with ❤️ for easy QR code generation
      </div>
    </div>
  )
}

export default App