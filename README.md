# 💬 Chatify | Scalable Real-Time Messaging

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stream](https://img.shields.io/badge/Stream_Chat-005FFF?style=for-the-badge&logo=getstream&logoColor=white)](https://getstream.io/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Chatify** is a modern, full-stack communication platform that delivers enterprise-grade messaging infrastructure. By leveraging **Stream Chat APIs** instead of manual WebSocket management, it achieves massive scalability, persistent message history, and rich features out of the box.

🌐 **[Live Demo](https://chatify-meetings.onrender.com/)** | 📂 **[Frontend Repo](#)** | 📂 **[Backend Repo](#)**

---

## 🚀 Key Features

### 🔐 Secure Authentication
* **JWT-based Auth:** Robust user registration and login flow.
* **Protected Routes:** Secure API access and frontend navigation.
* **Token Exchange:** Backend-generated Stream tokens for secure client-side connection.

### 💬 Rich Messaging (Powered by Stream)
* **Real-Time Sync:** Instant 1-on-1 messaging without manual socket handling.
* **UX Essentials:** Typing indicators, delivery status, and read receipts.
* **Persistence:** Fully searchable and persistent message history.

### 👥 Social & UI
* **Friend System:** Send/accept requests and discover new users via recommendations.
* **Theme Engine:** Global state-managed themes (DaisyUI + Zustand) for dynamic light/dark mode.
* **Responsive:** Mobile-first design optimized for all screen sizes.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Zustand, Tailwind CSS, DaisyUI, Stream Chat SDK |
| **Backend** | Node.js, Express.js, JWT, Stream Chat Server SDK |
| **Database** | MongoDB + Mongoose |
| **Deployment** | Render / Vercel |

---

## 🧠 Why Stream vs. Socket.IO?

I chose **Stream Chat** to focus on business logic and user experience rather than infrastructure maintenance.



| Feature | Socket.IO (Manual) | Stream Chat (Managed) |
| :--- | :--- | :--- |
| **Scalability** | ❌ Requires manual Load Balancing | ✅ Built-in Global Edge Network |
| **Message History** | ❌ Manual DB Implementation | ✅ Native Persistence |
| **Read Receipts** | ❌ Custom Logic Required | ✅ Out-of-the-box |
| **Maintenance** | ⚠️ High (Server/Socket Ops) | ✅ Low (API-driven) |

---

## 🏗 System Architecture

1.  **Client:** React app uses **Zustand** for UI state and **Stream SDK** for the chat connection.
2.  **Server:** Node.js handles auth, friend logic, and generates short-lived **Stream Tokens**.
3.  **Database:** MongoDB stores user profiles and social relationships.
4.  **Provider:** Stream handles the heavy lifting of real-time message broadcasting and storage.

---

## ⚙️ Environment Variables

Create a `.env` file in your **backend** directory:

```ini
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Get these from [https://getstream.io/dashboard/](https://getstream.io/dashboard/)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret
STREAM_APP_ID=your_stream_app_id
```

1️⃣ Clone the Repository
```
git clone [https://github.com/your-username/chatify.git](https://github.com/your-username/chatify.git)
cd chatify

```
2️⃣ Backend Setup
```
cd backend
npm install
npm run dev
```
3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```
Gemini said
This is a high-impact, professional README.md structure designed to make your Chatify project stand out to recruiters and open-source contributors alike. It uses clean typography, clear hierarchy, and visual cues to highlight your technical decisions.

Markdown
# 💬 Chatify | Scalable Real-Time Messaging

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stream](https://img.shields.io/badge/Stream_Chat-005FFF?style=for-the-badge&logo=getstream&logoColor=white)](https://getstream.io/)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Chatify** is a modern, full-stack communication platform that delivers enterprise-grade messaging infrastructure. By leveraging **Stream Chat APIs** instead of manual WebSocket management, it achieves massive scalability, persistent message history, and rich features out of the box.

🌐 **[Live Demo](https://chatify-meetings.onrender.com/)** | 📂 **[Frontend Repo](#)** | 📂 **[Backend Repo](#)**

---

## 🚀 Key Features

### 🔐 Secure Authentication
* **JWT-based Auth:** Robust user registration and login flow.
* **Protected Routes:** Secure API access and frontend navigation.
* **Token Exchange:** Backend-generated Stream tokens for secure client-side connection.

### 💬 Rich Messaging (Powered by Stream)
* **Real-Time Sync:** Instant 1-on-1 messaging without manual socket handling.
* **UX Essentials:** Typing indicators, delivery status, and read receipts.
* **Persistence:** Fully searchable and persistent message history.

### 👥 Social & UI
* **Friend System:** Send/accept requests and discover new users via recommendations.
* **Theme Engine:** Global state-managed themes (DaisyUI + Zustand) for dynamic light/dark mode.
* **Responsive:** Mobile-first design optimized for all screen sizes.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Zustand, Tailwind CSS, DaisyUI, Stream Chat SDK |
| **Backend** | Node.js, Express.js, JWT, Stream Chat Server SDK |
| **Database** | MongoDB + Mongoose |
| **Deployment** | Render / Vercel |

---

## 🧠 Why Stream vs. Socket.IO?

I chose **Stream Chat** to focus on business logic and user experience rather than infrastructure maintenance.



| Feature | Socket.IO (Manual) | Stream Chat (Managed) |
| :--- | :--- | :--- |
| **Scalability** | ❌ Requires manual Load Balancing | ✅ Built-in Global Edge Network |
| **Message History** | ❌ Manual DB Implementation | ✅ Native Persistence |
| **Read Receipts** | ❌ Custom Logic Required | ✅ Out-of-the-box |
| **Maintenance** | ⚠️ High (Server/Socket Ops) | ✅ Low (API-driven) |

---

## 🏗 System Architecture

1.  **Client:** React app uses **Zustand** for UI state and **Stream SDK** for the chat connection.
2.  **Server:** Node.js handles auth, friend logic, and generates short-lived **Stream Tokens**.
3.  **Database:** MongoDB stores user profiles and social relationships.
4.  **Provider:** Stream handles the heavy lifting of real-time message broadcasting and storage.

---

## ⚙️ Environment Variables

Create a `.env` file in your **backend** directory:

```ini
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

# Get these from [https://getstream.io/dashboard/](https://getstream.io/dashboard/)
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_secret
STREAM_APP_ID=your_stream_app_id
```
🛠 Installation & Setup
1️⃣ Clone the Repository
```
Bash
git clone [https://github.com/your-username/chatify.git](https://github.com/your-username/chatify.git)
cd chatify
```
2️⃣ Backend Setup
```
Bash
cd backend
npm install
npm run dev
```
3️⃣ Frontend Setup
```
Bash
cd frontend
npm install
npm run dev
```
📦 Project Structure

```
chatify/
├── backend/
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API Endpoints
│   └── server.js       # Entry point
├── frontend/
│   ├── components/     # Reusable UI parts
│   ├── store/          # Zustand state
│   ├── pages/          # View logic
│   └── main.jsx        # App entry
└── README.md
```
