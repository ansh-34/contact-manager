# Contact Manager (MERN)

A simple contacts CRUD with an Express/MongoDB API and a React + Tailwind UI.

## Prerequisites
- Node.js 18+
- MongoDB (local `mongod` or MongoDB Atlas connection string)

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env` and set:
   - `PORT=5000`
   - `MONGO_URI=<your mongodb uri, e.g. mongodb://localhost:27017/contact-manager or your Atlas URI>`
4. Start dev server: `npm run dev`
   - Should log: `MongoDB Connected` and `Server running on port 5000`

### Frontend
1. `cd frontend`
2. `npm install`
3. Start dev server: `npm run dev`
4. Open the URL printed by Vite (default http://localhost:5173)

## API
- `POST /api/contacts` — create a contact (name, phone required; email optional; message optional)
- `GET /api/contacts` — list contacts (sorted by newest)
- `DELETE /api/contacts/:id` — delete a contact

## Tech Stack
- Backend: Node.js, Express, Mongoose, dotenv, cors, nodemon (dev)
- Frontend: React, Vite, Tailwind CSS

## Notes
- The frontend calls the backend at `http://localhost:5000`. If you change the backend port or host, update the axios URLs accordingly (e.g., use a Vite env `VITE_API_URL`).
- Ensure MongoDB is running and the `MONGO_URI` points to an existing cluster/database. Collections are created automatically on first write.
