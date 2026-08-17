# 🎓 Studiqo — AI-Powered Study Assistant

> A modern, responsive AI-powered study assistant designed to help BTech CSE students learn, understand, and revise technical concepts through an interactive AI chat experience.

## 📌 Overview

**Studiqo** is a full-stack AI Study Assistant web application built specifically for students. It provides an interactive environment where users can ask academic questions, get AI-generated explanations, manage conversations, and access quick study actions through a clean and modern interface.

The application combines a responsive React frontend with a Node.js/Express backend, MongoDB database, authentication, and AI-powered responses.

---

## ✨ Key Features

* 🤖 **AI-Powered Academic Assistant**

  * Ask questions related to BTech CSE subjects
  * Generate easy-to-understand explanations
  * Get programming and technical concept assistance

* 💬 **Interactive AI Chat**

  * Real-time-style conversational interface
  * Chat history support
  * Clean message bubbles and typing indicators

* 🔐 **Authentication System**

  * User Login
  * User Signup
  * JWT-based authentication
  * Protected API routes

* ⚡ **Quick Study Actions**

  * Quick access to common study-related prompts
  * Faster interaction with the AI assistant

* 🎨 **Modern UI/UX**

  * Responsive design
  * Glassmorphism-inspired interface
  * Smooth transitions
  * Gradient effects
  * Floating animations
  * Hover micro-interactions
  * Button glow and ripple effects
  * Animated AI typing state

* 📱 **Responsive Design**

  * Desktop
  * Tablet
  * Mobile

* 🗄️ **Persistent Data**

  * MongoDB database integration
  * User information
  * Authentication data
  * Chat-related data

* 🌐 **Production Deployment**

  * Frontend deployed using Vercel
  * Backend deployed using Render
  * Cloud MongoDB using MongoDB Atlas

---

## 🏗️ System Architecture

```text
                   ┌─────────────────────┐
                   │       User          │
                   │ Desktop / Mobile    │
                   └──────────┬──────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │   React Frontend    │
                   │       Vite          │
                   │   Tailwind / CSS    │
                   └──────────┬──────────┘
                              │
                         REST API
                              │
                              ▼
                   ┌─────────────────────┐
                   │  Node.js + Express  │
                   │      Backend        │
                   └───────┬─────┬───────┘
                           │     │
              ┌────────────┘     └─────────────┐
              ▼                                ▼
    ┌──────────────────┐              ┌──────────────────┐
    │   MongoDB Atlas  │              │   AI Service     │
    │     Database     │              │ AI Responses     │
    └──────────────────┘              └──────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* Tailwind CSS
* CSS3
* Axios

### Backend

* Node.js
* Express.js
* REST APIs
* JWT Authentication
* CORS
* dotenv

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

### Development Tools

* Git
* GitHub
* VS Code
* npm

### Deployment

* Vercel — Frontend
* Render — Backend
* MongoDB Atlas — Database

---

## 📂 Project Structure

```text
studiqo/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── lib/
│   │   │   └── axios.js
│   │   │
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── server/
│   ├── routes/
│   │   ├── auth.js
│   │   └── chat.js
│   │
│   ├── index.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## 🔐 Authentication

Studiqo implements token-based authentication using JWT.

### Authentication Flow

```text
User
 │
 ├── Signup
 │      ↓
 │   Backend API
 │      ↓
 │   User stored in MongoDB
 │
 └── Login
        ↓
     Backend API
        ↓
     JWT Token
        ↓
     Local Storage
        ↓
  Authenticated Requests
```

The JWT token is automatically attached to API requests using an Axios interceptor.

---

## 🔌 API Structure

### Authentication

```text
POST /api/auth/register
```

Creates a new user account.

```text
POST /api/auth/login
```

Authenticates an existing user.

### Chat

```text
POST /api/chat
```

Sends a user query to the AI assistant.

Additional chat endpoints can be added as the application evolves.

---

## ⚙️ Environment Variables

### Frontend

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

For local development:

```env
VITE_API_URL=http://localhost:5000
```

### Backend

Create:

```text
server/.env
```

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

> Never commit `.env` files or API keys to GitHub.

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Saksham10-art/studiqo.git
cd studiqo
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create the required `.env` files in `client` and `server`.

### 5. Start backend

```bash
cd server
npm start
```

Backend runs on:

```text
http://localhost:5000
```

### 6. Start frontend

```bash
cd client
npm run dev
```

Frontend runs on the Vite development URL shown in the terminal.

---

## 🌐 Deployment

### Frontend — Vercel

1. Import the GitHub repository.
2. Set the root directory to:

```text
client
```

3. Build command:

```text
npm run build
```

4. Output directory:

```text
dist
```

5. Add:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

6. Deploy.

### Backend — Render

1. Create a new Web Service.
2. Connect the GitHub repository.
3. Set root directory:

```text
server
```

4. Build command:

```text
npm install
```

5. Start command:

```text
npm start
```

6. Add backend environment variables.
7. Deploy.

---

## 🎨 UI & Animation System

Studiqo focuses on a premium SaaS-style interface.

Implemented UI effects include:

* Gradient background animation
* Floating logo animation
* Smooth card hover effects
* Purple glow effects
* Button micro-interactions
* Ripple effects
* Glassmorphism panels
* Animated typing indicator
* Message slide-up animation
* Focus glow on chat input
* Responsive sidebar
* Smooth transitions

All major animations are implemented using CSS/Tailwind to keep the application lightweight.

---

## 🧠 Core Learning Use Cases

Studiqo can assist students with:

* Data Structures & Algorithms
* DBMS
* Operating Systems
* Computer Networks
* Computer Architecture
* Object-Oriented Programming
* Java / Python / JavaScript
* Web Development
* Software Engineering
* Artificial Intelligence
* Machine Learning
* Theory of Computation
* Compiler Design

The assistant is designed to explain complex concepts in a simpler and student-friendly manner.

---

## 🔮 Future Enhancements

* 📚 AI-generated study notes
* 📝 AI quiz generation
* 🧠 Personalized learning roadmap
* 📊 Student learning analytics
* 🔖 Bookmark important answers
* 📄 PDF/document-based question answering
* 🎯 Exam preparation mode
* 🔊 AI voice interaction
* 🌍 Multi-language explanations
* 📅 AI-powered study planner
* 🏆 Progress and achievement system

---

## 📈 Project Highlights

* Full-stack AI application
* Responsive modern UI
* Secure authentication
* RESTful backend architecture
* MongoDB cloud database
* Environment-based configuration
* Production deployment
* Modular React component architecture
* Scalable frontend/backend structure

---

## 👨‍💻 Author

**Saksham Sharma**

B.Tech — Computer Science & Engineering

GitHub: `https://github.com/Saksham10-art`

---

## ⭐ Support

If you find **Studiqo** useful, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and academic purposes.
