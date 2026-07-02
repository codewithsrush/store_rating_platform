# ⭐ Store Rating Platform

A full-stack web application that allows users to discover stores, submit ratings, and enables administrators and store owners to manage the platform through secure role-based dashboards.

## 🚀 Tech Stack

**Frontend**
- React (Vite)
- Material UI
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- JWT Authentication
- bcrypt

**Database**
- MySQL

---

## ✨ Features

### 🔐 Authentication
- User Registration & Login
- JWT-based Authentication
- Role-Based Access Control
- Secure Password Hashing

### 👨‍💼 Admin
- Dashboard Overview
- Manage Users
- Manage Stores
- View Platform Statistics
- Search Users & Stores

### 👤 User
- Browse Stores
- Search Stores
- Submit Ratings (1–5)
- Update Ratings
- View Store Ratings

### 🏪 Store Owner
- Dashboard
- View Average Store Rating
- View Customer Ratings

---

## 📁 Project Structure

```text
Store-Rating-Platform/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   └── theme/
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/Store-Rating-Platform.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_platform
JWT_SECRET=your_secret_key
```



## 👩‍💻 Developer

**Srushti Mhaske**

---

## 📄 License

This project was developed for educational purposes.