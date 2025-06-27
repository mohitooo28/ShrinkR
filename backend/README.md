# 🔗 ShrinkR Backend

<div align="center">
  <img src="../frontend/public/logo.svg" alt="ShrinkR Logo" width="120" height="120">
  
  **A secure, scalable URL shortener API with powerful analytics**
  
  [![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)
  [![Express](https://img.shields.io/badge/Express-4.18.2-black.svg)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-8.0.0-green.svg)](https://mongodb.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](../LICENSE)
</div>

---

## ✨ Features

🛡️ **Security First** - IP whitelisting, rate limiting, CORS protection, and security headers  
📊 **Analytics Tracking** - Track clicks, timestamps, and visitor information with detailed analytics  
🚀 **Fast & Scalable** - Optimized database queries and efficient caching  
🔒 **Production Ready** - Environment-based configuration with security best practices  
📝 **Comprehensive API** - RESTful API with proper error handling and validation  
🌐 **CORS Support** - Configurable cross-origin resource sharing  
⚡ **Rate Limiting** - Multiple layers of request throttling  
🔍 **Input Validation** - Comprehensive URL and input sanitization

## 🚀 Quick Start

### Prerequisites

-   Node.js 16+
-   MongoDB (local or Atlas)
-   npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/mohitooo28/ShrinkR/backend.git

# Navigate to project directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

🎉 **That's it!** Your API is running at [http://localhost:3000](http://localhost:3000)

## 🛠️ Core Dependencies

-   **🏗️ Framework**: Node.js with Express.js server
-   **🗄️ Database**: MongoDB with Mongoose ODM
-   **🛡️ Security**: Helmet.js, CORS, Express Rate Limit
-   **🔧 Validation**: Custom validators with comprehensive URL checking
-   **📊 ID Generation**: Nanoid for short, URL-safe identifiers
-   **⚙️ Environment**: Dotenv for configuration management

## 📁 Project Structure

```
src/
├── 📂 config/              # Configuration files
│   ├── database.js         # MongoDB connection
│   └── index.js            # App configuration
├── 📂 controllers/         # Business logic
│   └── urlController.js    # URL operations
├── 📂 middleware/          # Express middleware
│   ├── rateLimiter.js      # Rate limiting configs
│   └── security.js         # Security & IP whitelist
├── 📂 models/              # Database schemas
│   └── url.js              # URL data model
├── 📂 routes/              # API endpoints
│   └── urlRoutes.js        # URL routes
├── 📂 utils/               # Helper functions
│   ├── responseHandler.js  # Response formatting
│   └── shortIdGenerator.js # ID generation
├── 📂 validators/          # Input validation
│   └── urlValidator.js     # URL validation
└── 🎯 server.js            # Main server file
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/ShrinkR

# Server
PORT=3000
NODE_ENV=development

# Security (Required for production)
ALLOWED_IPS=127.0.0.1,::1,YOUR_FRONTEND_SERVER_IP
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Rate Limiting
RATE_LIMIT_WINDOW_MS=600000
RATE_LIMIT_MAX_REQUESTS=50
```

## 🎨 Key Components

### 🔗 URL Management

-   **urlController**: Core business logic for URL operations
-   **urlRoutes**: RESTful API endpoints
-   **url**: MongoDB schema and model
-   **urlValidator**: Comprehensive input validation

### 🛡️ Security Layer

-   **security**: IP whitelisting and access control
-   **rateLimiter**: Multi-layer rate limiting
-   **responseHandler**: Secure response formatting
-   **shortIdGenerator**: Secure ID generation

### 🎯 Core Services

-   **database**: MongoDB connection and configuration
-   **server**: Express server setup and middleware
-   **config**: Environment-based configuration
-   **validators**: Input sanitization and validation

## 🔧 API Endpoints

### Health Check

```http
GET /health
```

**Response:**

```json
{
    "status": "OK",
    "timestamp": "2025-06-27T10:30:00.000Z",
    "uptime": 1234.567,
    "environment": "production"
}
```

### Create Short URL

```http
POST /url
Content-Type: application/json

{
  "url": "https://example.com/very-long-url",
  "customId": "mylink" // optional
}
```

**Response:**

```json
{
    "success": true,
    "message": "Short URL created successfully",
    "data": {
        "id": "abc12345",
        "url": "https://example.com/very-long-url"
    },
    "timestamp": "2025-06-27T10:30:00.000Z"
}
```

### Get Analytics

```http
GET /url/analytics/{shortId}
```

**Response:**

```json
{
    "success": true,
    "message": "Analytics retrieved successfully",
    "data": {
        "shortId": "abc12345",
        "originalUrl": "https://example.com/very-long-url",
        "totalClicks": 15,
        "createdAt": "2025-06-27T10:30:00.000Z",
        "analytics": [
            {
                "visitNumber": 1,
                "timestamp": 1719485400000,
                "date": "2025-06-27T10:30:00.000Z",
                "userAgent": "Mozilla/5.0...",
                "browser": "Chrome 91",
                "device": "Desktop (Windows)",
                "timeAgo": "2 hours ago"
            }
        ]
    }
}
```

### Redirect to Original URL

```http
GET /{shortId}
```

Redirects to the original URL and tracks the visit.

---
