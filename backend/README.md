# Tetarasa API

Express 5 API using TypeScript, PostgreSQL, bcrypt password hashing, JWT bearer tokens, and Zod request validation.

## Start locally

1. Install dependencies with `npm install --prefix backend` from the repository root.
2. Copy `backend/.env.example` to `backend/.env` and set `DATABASE_URL` and a random `JWT_SECRET` (at least 32 characters).
3. Create the PostgreSQL database named `tetarasa` or update `DATABASE_URL`.
4. Apply the initial schema with `npm --prefix backend run migrate` from the repository root, or `npm run migrate` inside `backend`.
5. Start the API with `npm --prefix backend run dev` from the repository root, or `npm run dev` inside `backend`. It listens on port 4000 by default.

`GET /api/health` reports API status and whether PostgreSQL is reachable. The HTTP server can start while PostgreSQL is unavailable; database-backed routes require a reachable database and the migration.

## Routes

- `POST /api/auth/register` — create a mother or caregiver account; body: `{ fullName, email, phone, password, role }`.
- `POST /api/auth/login` — body: `{ email, password }`; returns a JWT and safe user details.
- `GET /api/auth/me` — authenticated account details.
- `GET /api/caregivers?q=&location=&service=` and `GET /api/caregivers/:id` — caregiver search/profile.
- `GET /api/mothers/me/profile`, `PUT /api/mothers/me/profile` — authenticated mother's profile.
- `GET /api/requests`, `POST /api/requests` — list requests for current account/create a mother request.
- `PATCH /api/requests/:id/respond` — caregiver accepts or declines a pending request.
- `PATCH /api/requests/:id/cancel` — mother cancels a pending request.
- `GET /api/appointments`, `POST /api/appointments` — list appointments or schedule one from an accepted request.

Send protected requests with `Authorization: Bearer <token>`. Data is stored in PostgreSQL after setup; this API does not connect the existing mock frontend flows automatically.
