# 🔋 Battery Indicator

A real-time device battery monitoring web application built with React, TypeScript, and Vite. This application uses the Battery Status API to display comprehensive battery information directly in your browser.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Browser Compatibility](#browser-compatibility)
- [Development](#development)
- [Build & Deploy](#build--deploy)
- [License](#license)

## ✨ Features

- **Real-time Battery Monitoring**: Live tracking of device battery level and charging status
- **Charging Information**: Displays estimated charging and discharging time
- **Responsive Design**: Clean, modern UI that works on all devices
- **TypeScript Support**: Fully typed application for better developer experience
- **Auto-refresh**: Updates battery status every minute
- **Error Handling**: Graceful fallback for unsupported browsers
- **Fast Development**: Hot Module Replacement (HMR) with Vite

## 🛠️ Tech Stack

- **React** (v19.2.0) - UI library
- **TypeScript** (v5.9.3) - Static typing
- **Vite** (v7.2.4) - Build tool and dev server
- **ESLint** - Code quality and linting
- **CSS3** - Styling

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Steps

1. Clone the repository:

```bash
git clone <repository-url>
cd Battery-Indicator
```

2. Install dependencies:

```bash
npm install
```

## 🚀 Usage

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
Battery-Indicator/
├── src/
│   ├── components/
│   │   └── BatteryIndicator/
│   │       ├── BatteryIndicator.tsx      # Main battery display component
│   │       ├── BatteryIndicator.css      # Component styling
│   │       └── index.ts                  # Component export
│   ├── types/
│   │   └── battery.ts                    # TypeScript interfaces for Battery API
│   ├── styles/
│   │   └── global.css                    # Global styles
│   ├── App.tsx                           # Main app component
│   ├── App.css                           # App styles
│   ├── main.tsx                          # React entry point
│   └── index.css                         # Base styles
├── public/
│   └── index.html                        # HTML template
├── index.html                            # Root HTML file
├── package.json                          # Dependencies and scripts
├── tsconfig.json                         # TypeScript configuration
├── vite.config.ts                        # Vite configuration
├── eslint.config.js                      # ESLint configuration
└── README.md                             # This file
```

## 🔋 Battery Status API

The Battery Indicator uses the **Battery Status API** to access device battery information:

### Supported Properties

- **Level**: Battery percentage (0-1)
- **Charging**: Whether the device is currently charging
- **Charging Time**: Estimated time to full charge in seconds
- **Discharging Time**: Estimated time until battery depletes in seconds

### API Details

```typescript
interface BatteryStatus {
  level: number; // 0 to 1 (0% to 100%)
  charging: boolean; // Charging state
  chargingTime: number; // Seconds to full charge
  dischargingTime: number; // Seconds until battery depletes
}
```

## 🌐 Browser Compatibility

This application works best on:

- ✅ **Chrome/Chromium** (recommended)
- ✅ **Edge**
- ⚠️ **Firefox** - Limited support
- ❌ **Safari** - Not supported
- ❌ **IE** - Not supported

**Note**: The Battery Status API is a deprecated API. Browser support is limited and varies by platform. The application includes fallback messaging for unsupported browsers.

## 👨‍💻 Development

### Available Commands

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start development server with HMR |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview production build          |
| `npm run lint`    | Check code quality with ESLint    |

### Code Quality

The project uses ESLint with React and TypeScript support to maintain code quality. Configuration can be extended in `eslint.config.js`.

## 📦 Build & Deploy

### Build Process

The build process includes:

1. TypeScript compilation (`tsc -b`)
2. Vite bundling and optimization
3. Output to `dist/` directory

### Deployment

Deploy the `dist/` folder to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront

## 📄 License

This project is created by Taofeek Kehinde. All rights reserved.

---

**Made with ❤️ for battery monitoring**
