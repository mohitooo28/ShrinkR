# 🔗 ShrinkR - Complete URL Shortener Platform

<div align="center">
  <img src="frontend/public/logo.svg" alt="ShrinkR Logo" width="120" height="120">
  
  **A modern, secure, and beautiful URL shortener with powerful analytics**
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.18.2-black.svg)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-8.0.0-green.svg)](https://mongodb.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.0.8-646CFF.svg)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.11-06B6D4.svg)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

---

## ✨ Features

### 🔗 Core Features

-   **URL Shortening** - Create short, memorable links instantly
-   **Custom Short IDs** - Optional custom identifiers for branded links
-   **QR Code Generation** - Generate QR codes for any short link
-   **Real-time Analytics** - Track clicks with detailed insights
-   **Visit History** - Comprehensive tracking of all visits

### 🎨 Frontend Features

-   **Modern UI** - Clean, intuitive React-based interface
-   **Dark Mode** - Beautiful light and dark themes
-   **Responsive Design** - Perfect on all devices
-   **Real-time Updates** - Live analytics and statistics
-   **Social Sharing** - Built-in sharing capabilities
-   **Error Boundaries** - Graceful error handling

### 🛡️ Security Features

-   **IP Whitelisting** - Production-ready access control
-   **Rate Limiting** - Multiple layers of request throttling
-   **CORS Protection** - Configurable cross-origin policies
-   **Input Validation** - Comprehensive URL and input sanitization
-   **Security Headers** - Helmet.js protection suite
-   **Malicious URL Detection** - Blocks dangerous protocols and IPs

## 🏗️ Architecture

```
ShrinkR/
├── 📁 backend/
│   ├── src/
│   │   ├── config/           # Database & app configuration
│   │   ├── controllers/      # Business logic
│   │   ├── middleware/       # Security & rate limiting
│   │   ├── models/           # MongoDB schemas
│   │   ├── routes/           # API endpoints
│   │   ├── utils/            # Helper functions
│   │   ├── validators/       # Input validation
│   │   └── server.js         # Main server file
│   └── package.json
│
├── 📁 frontend/
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Analytics/    # Analytics dashboard
│   │   │   └── UrlShortener/ # URL shortening UI
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API communication
│   │   └── utils/            # Helper utilities
│   └── package.json
│
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

-   **Node.js** 16+
-   **MongoDB** (local or Atlas)
-   **npm/yarn/pnpm**

### 1. Clone & Setup

```bash
# Clone the repository
git clone https://github.com/mohitooo28/ShrinkR
cd ShrinkR

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

#### Backend Environment (`.env` in `backend/`)

```env
# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/ShrinkR

# Server
PORT=3000
NODE_ENV=development

# Security (Required for production)
ALLOWED_IPS=127.0.0.1,::1,YOUR_FRONTEND_SERVER_IP
ALLOWED_ORIGINS=http://localhost:5173,https://yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX_REQUESTS=50
```

#### Frontend Environment (`.env` in `frontend/`)

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000
```

### 3. Start Development Servers

```bash
# Terminal 1 - Start backend server
cd backend
npm run dev

# Terminal 2 - Start frontend server
cd frontend
npm run dev
```

🎉 **Access the application:**

-   **Frontend**: [http://localhost:5173](http://localhost:5173)
-   **Backend API**: [http://localhost:3000](http://localhost:3000)
-   **Health Check**: [http://localhost:3000/health](http://localhost:3000/health)

## 📋 API Endpoints

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| `GET`  | `/health`                  | Server health check      |
| `POST` | `/url`                     | Create short URL         |
| `GET`  | `/{shortId}`               | Redirect to original URL |
| `GET`  | `/url/analytics/{shortId}` | Get URL analytics        |

## 🛠️ Technology Stack

### Backend Stack

-   **🏗️ Framework**: Node.js + Express.js
-   **🗄️ Database**: MongoDB with Mongoose ODM
-   **🛡️ Security**: Helmet.js, CORS, Express Rate Limit
-   **🔧 Validation**: Custom validators with comprehensive URL checking
-   **📊 ID Generation**: Nanoid for short, URL-safe identifiers

### Frontend Stack

-   **⚛️ Framework**: React 18 with modern hooks
-   **⚡ Build Tool**: Vite for lightning-fast development
-   **🎨 Styling**: Tailwind CSS for utility-first styling
-   **🔄 State Management**: React Query for server state
-   **🌐 HTTP Client**: Axios for API communication
-   **📱 QR Codes**: qrcode library for QR generation
-   **🔥 Notifications**: React Hot Toast for beautiful alerts

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for secure, scalable, and beautiful URL shortening**

[🌟 Star this repo](../../stargazers) • [🐛 Report Bug](../../issues) • [💡 Request Feature](../../issues)

</div>
