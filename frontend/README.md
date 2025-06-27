# 🔗 ShrinkR Frontend

<div align="center">
  <img src="public/logo.svg" alt="ShrinkR Logo" width="120" height="120">
  
  **A modern, beautiful URL shortener with powerful analytics**
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-06B6D4.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

## ✨ Features

🔗 **URL Shortening** - Create short, memorable links instantly  
📊 **Analytics Dashboard** - Track clicks with detailed insights  
📱 **QR Code Generation** - Generate QR codes for any short link  
🌓 **Dark Mode** - Beautiful light and dark themes  
📱 **Responsive Design** - Perfect on all devices  
⚡ **Real-time Updates** - Live analytics and statistics  
🎨 **Modern UI** - Clean, intuitive interface  
🔒 **Secure** - Built with security best practices

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mohitooo28/ShrinkR/frontend.git

# Navigate to project directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

🎉 **That's it!** Open [http://localhost:5173](http://localhost:5173) to see ShrinkR in action.

## 🛠️ Core Dependencies

-   **🏗️ Framework**: React 18 with modern hooks
-   **⚡ Build Tool**: Vite for lightning-fast development
-   **🎨 Styling**: Tailwind CSS for utility-first styling
-   **🔄 State Management**: React Query for server state
-   **🌐 HTTP Client**: Axios for API communication
-   **📱 QR Codes**: qrcode library for QR generation
-   **🔥 Notifications**: React Hot Toast for beautiful alerts

## 📁 Project Structure

```
src/
├── 📂 components/              # React components
│   ├── 📊 Analytics/           # Analytics dashboard components
│   │   ├── AnalyticsForm.jsx
│   │   ├── AnalyticsDashboard.jsx
│   │   ├── AnalyticsSummaryCards.jsx
│   │   ├── AnalyticsUrlDisplay.jsx
│   │   └── AnalyticsVisitHistory.jsx
│   ├── 🎨 UI/                   # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── InputField.jsx
│   │   └── Loading.jsx
│   └── 🔗 UrlShortener/         # URL shortening components
│       ├── UrlForm.jsx
│       ├── ResultDisplay.jsx
│       ├── QRModal.jsx
│       └── ShareModal.jsx
├── 🪝 hooks/                    # Custom React hooks
│   ├── useAnalytics.js
│   ├── useApi.js
│   └── useDarkMode.js
├── 🔧 services/                 # API services
│   └── api.js
├── 🛠️ utils/                    # Utility functions
│   └── helpers.jsx
└── 🎯 main.jsx                  # App entry point
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://your-api-domain.com/

```

## 🎨 Key Components

### 🔗 URL Shortener

-   **UrlForm**: Input form with validation
-   **ResultDisplay**: Shows shortened URL with copy functionality
-   **QRModal**: QR code generation and download
-   **ShareModal**: Social sharing options

### 📊 Analytics Dashboard

-   **AnalyticsForm**: Search for URL analytics
-   **SummaryCards**: Key metrics display
-   **VisitHistory**: Detailed click tracking table
-   **UrlDisplay**: Original and short URL information

### 🎯 Shared Components

-   **Header**: Navigation with dark mode toggle
-   **Footer**: Site footer with links
-   **ErrorBoundary**: Graceful error handling
-   **Loading**: Beautiful loading states

---
