# Contact Manager (MERN)

A full-stack contact management app with JWT authentication, built with Express/MongoDB backend and React + Tailwind CSS frontend.

## Features
- 🔐 User authentication (signup/login with JWT)
- 📇 Create, read, and delete contacts
- 👤 Per-user contact isolation (users only see their own contacts)
- ✅ Client-side validation with error messages
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

## Local Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` file with:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/contact-manager
   FRONTEND_ORIGIN=http://localhost:5173
   JWT_SECRET=your-secret-key-here
   ```
4. Start dev server: `npm run dev`
   - Should log: `MongoDB Connected` and `Server running on port 5000`

### Frontend
1. `cd frontend`
2. `npm install`
3. Create `.env` file with:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start dev server: `npm run dev`
5. Open http://localhost:5173

## Deployment

### Backend (Render)
1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables:
   - `MONGO_URI` — your MongoDB Atlas connection string
   - `JWT_SECRET` — a secure random string
   - `FRONTEND_ORIGIN` — your Vercel frontend URL (comma-separated for multiple)
7. Deploy

### Frontend (Vercel)
1. Import project from GitHub
2. Set root directory: `frontend`
3. Build command: `npm run build`
4. Output directory: `dist`
5. Add environment variable:
   - `VITE_API_URL` — your Render backend URL (e.g., `https://your-app.onrender.com`)
6. Deploy

## API Endpoints

### Auth
- `POST /api/auth/signup` — create account (name, email, password)
- `POST /api/auth/login` — login (email, password) → returns JWT

### Contacts (requires JWT)
- `POST /api/contacts` — create contact (name, phone required; email, message optional)
- `GET /api/contacts` — list user's contacts (sorted by newest)
- `DELETE /api/contacts/:id` — delete contact

All contact routes require `Authorization: Bearer <token>` header.

## Tech Stack

### Backend
- Node.js, Express
- MongoDB, Mongoose
- JWT authentication (jsonwebtoken, bcryptjs)
- CORS, dotenv
- Nodemon (dev)

### Frontend
- React 19, Vite
- Tailwind CSS v4
- Axios
- Context API for auth state

## Project Structure
```
contact-manager/
├── backend/
│   ├── config/         # DB connection
│   ├── controllers/    # Auth & contact logic
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # User & Contact schemas
│   ├── routes/         # API routes
│   ├── server.js       # Express app entry
│   └── .env            # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/ # Auth forms, contact form/list
│   │   ├── context/    # AuthContext
│   │   ├── lib/        # Axios client
│   │   ├── App.jsx     # Main component
│   │   └── main.jsx    # React entry
│   └── .env            # Frontend env vars
└── README.md
```

## Notes
- Users must sign up/login before accessing contacts
- Each user's contacts are isolated via `userId` field
- JWT tokens expire after 7 days
- MongoDB Atlas IP whitelist must include your deployment platform (e.g., 0.0.0.0/0 for Render)
- Frontend uses axios interceptors to attach JWT to all requests
