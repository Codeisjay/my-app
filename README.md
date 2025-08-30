# Auth Project (Railway Deployment)

This is a simple full-stack authentication project with **Express + MongoDB + JWT** backend and **React** frontend.

## 🚀 Features
- Signup/Login with bcrypt hashed passwords
- JWT token authentication
- Protected route `/protected`
- Fully deployable on Railway

## ⚙️ Deployment on Railway
1. Push this repo to GitHub
2. Create new project on [Railway](https://railway.app/)
3. Railway detects both services using `railway.toml`
4. Add environment variables:
   - **Backend**: `MONGO_URI`, `JWT_SECRET`
   - **Frontend**: `REACT_APP_API_URL` = your backend Railway URL
5. Deploy 🚀

## Local Development
- Start backend:
  ```bash
  cd backend
  npm install
  npm start
  ```
- Start frontend:
  ```bash
  cd frontend
  npm install
  npm start
  ```
