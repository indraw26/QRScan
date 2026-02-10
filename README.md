# QR Scanner

<div align="center">

![QR Scanner Logo](public/qr-icon.svg)

A modern, feature-rich browser extension for generating and scanning QR codes with a beautiful, intuitive interface.

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/indraw26/QRScan)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6.svg)](https://www.typescriptlang.org/)

</div>

## ✨ Features

### 🎨 Core Functionality
- **QR Code Generation** - Create QR codes from any text or URL instantly
- **QR Code Scanning** - Scan QR codes from web pages with a single click
- **Download Support** - Save generated QR codes as PNG images
- **History Tracking** - Keep track of all your generated and scanned QR codes
- **Dark/Light Theme** - Seamless theme switching with system preference detection

### 🚀 User Experience
- **Premium UI Design** - Modern, clean interface with smooth animations
- **Responsive Layout** - Optimized for browser extension popup dimensions
- **Real-time Preview** - See QR codes as you type
- **Quick Actions** - One-click copy, download, and regenerate
- **Persistent Storage** - Your history and settings are saved locally

## 📸 Screenshots

> Add screenshots of your extension here

## 🛠️ Tech Stack

### Frontend Framework
- **React 19.2** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe development
- **Vite 7.2** - Lightning-fast build tool with HMR

### UI & Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - Toast notifications
  - Tooltips
  - Themes
- **Lucide React** - Beautiful, consistent icons

### State Management & Data
- **TanStack Query 5.90** - Powerful async state management
- **React Router 7.13** - Client-side routing
- **Context API** - Theme and history management

### QR Code Libraries
- **qrcode.react** - QR code generation
- **jsQR** - QR code scanning/decoding

### Developer Tools
- **ESLint** - Code linting with React-specific rules
- **React Compiler** - Automatic optimization
- **TypeScript ESLint** - Type-aware linting

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun
- A Chromium-based browser (Chrome, Edge, Brave, etc.)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/indraw26/QRScan.git
   cd QRScan
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   # or
   bun run build
   ```

### Loading the Extension

1. Build the extension using `npm run build`
2. Open your browser and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top-right corner)
4. Click "Load unpacked"
5. Select the `dist` folder from the project directory
6. The extension icon should appear in your browser toolbar

## 🎯 Usage

### Creating QR Codes

1. Click the extension icon in your browser toolbar
2. Navigate to the "Create" tab (default view)
3. Enter your text or URL
4. Click "Generate QR Code"
5. Download or copy the generated QR code

### Scanning QR Codes

1. Open the extension
2. Navigate to the "Read" tab
3. Click "Scan Page" to detect QR codes on the current webpage
4. View and copy the decoded content

### Managing History

1. Navigate to the "History" tab
2. View all previously generated and scanned QR codes
3. Click on any item to view details or regenerate
4. Clear history as needed

### Settings

1. Navigate to the "Settings" tab
2. Toggle between light and dark themes
3. Customize extension behavior
4. Manage storage and privacy options

## 📁 Project Structure

```
QRScan/
├── public/
│   ├── icons/              # Extension icons (16, 48, 128px)
│   ├── manifest.json       # Chrome extension manifest
│   └── qr-icon.svg        # App logo
├── src/
│   ├── commons/           # Shared components
│   │   └── Button.tsx     # Reusable button component
│   ├── components/        # Layout components
│   │   ├── ExtensionLayout.tsx
│   │   ├── NavLink.tsx
│   │   └── TabBar.tsx
│   ├── contexts/          # React contexts
│   │   ├── HistoryContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/             # Page components
│   │   ├── CreateQRCode/  # QR generation page
│   │   ├── ReadPageQR/    # QR scanning page
│   │   ├── History/       # History page
│   │   ├── Settings/      # Settings page
│   │   ├── AboutMe/       # About page
│   │   └── Index.tsx      # Main router
│   ├── lib/               # Utilities
│   ├── App.tsx            # App root with providers
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Path Aliases

The project uses `@` as an alias for the `src` directory:

```typescript
import Button from '@/commons/Button';
import { useTheme } from '@/contexts/ThemeContext';
```

### Build Configuration

The extension is built using Vite with optimized settings for browser extensions:
- Hash-based asset naming for cache busting
- Optimized chunk splitting
- Manifest V3 compliance

## 🧪 Development

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

### Code Style

This project uses:
- ESLint for code quality
- TypeScript for type safety
- React Compiler for automatic optimization
- Prettier-compatible formatting

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Indra W**
- GitHub: [@indraw26](https://github.com/indraw26)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [qrcode.react](https://github.com/zpao/qrcode.react) - QR generation
- [jsQR](https://github.com/cozmo/jsQR) - QR scanning

## 🐛 Known Issues

- None currently reported

## 🗺️ Roadmap

- [ ] Add QR code customization (colors, logos)
- [ ] Support for vCard and WiFi QR codes
- [ ] Batch QR code generation
- [ ] Export history as CSV
- [ ] Browser sync for history across devices
- [ ] QR code analytics

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on [GitHub](https://github.com/indraw26/QRScan/issues)
- Check existing issues for solutions

---

<div align="center">

Made with ❤️ by [Indra W](https://github.com/indraw26)

⭐ Star this repo if you find it useful!

</div>
