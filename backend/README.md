# 📝 Blog Backend

A lightweight and performant backend for a blog API built using [**Hono**](https://hono.dev/) (edge-first web framework) and [**Prisma**](https://www.prisma.io/) (Edge Client). This backend supports full blog post CRUD with JWT-based authentication and is optimized for serverless environments like **Cloudflare Workers**.

---

## 🚀 Features

- 🔐 JWT Authentication (signup & signin)
- 🧑‍💻 Authenticated Blog Creation & Updating
- 📄 Blog Post Retrieval (single and bulk)
- 🖼 Image URLs support for blog posts
- ⚡️ Edge-ready Prisma Client with Accelerate
- 🧩 Modular Route & Middleware Architecture

---

## 📁 Project Structure
backend/
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── generated/           # Generated Prisma Edge client
│   ├── middlewares/         # JWT authentication middleware
│   ├── routes/              # Blog and user route handlers
│   ├── zod.ts               # Zod validation (or types from common package)
│   └── index.ts             # Main Hono app entry point
├── .env                     # Environment variables
├── package.json
├── tsconfig.json
├── wrangler.jsonc          # Cloudflare Workers configuration
└── README.md


---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` folder with the following:

AIVEN_DATABASE_URL=your_postgresql_or_prisma_accelerate_connection_string JWT_SECRET=your_jwt_secret


- `AIVEN_DATABASE_URL` should be a PostgreSQL connection string or a Prisma Accelerate URL for edge/serverless.
- `JWT_SECRET` is used for signing JWT tokens.

---

## 🛠️ Setup & Development

1. **Install dependencies**
   ```sh
   npm install

2. Run database migrations
    npx prisma migrate deploy

3. Generate Prisma Client (Edge)
    npx prisma generate         

4.  Start the development server
    npx wrangler dev

---

## 🗄️ Database Schema

The main models are defined in prisma/schema.prisma:
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("AIVEN_DATABASE_URL")
}

model User{
  id String @id @default(uuid())
  email String @unique
  name String
  password String
  posts Post[]
}

model Post{
  id String @id @default(uuid())
  title String
  content String
  tag String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  images String[]
  published Boolean @default(false)
  authorId String
  author User @relation(fields: [authorId], references: [id])
}

---

### 🔗 API Endpoints

## 👤 User Endpoints

POST /api/v1/user/signup — Register a new user
POST /api/v1/user/signin — Login and receive a JWT token

## 📝 Blog Endpoints

POST /api/v1/blog — Create a new blog post (requires JWT)
PUT /api/v1/blog — Update a blog post (requires JWT)
DELETE /api/v1/blog/delete/:blogid — Delete a blog post (requires JWT)
GET /api/v1/blog/:id — Get a single blog post by ID
GET /api/v1/blog/bulk — Get all blog posts (paginated)

---

## 🧪 Development Notes

Uses Hono for fast routing and edge-first development.
Uses Prisma Edge Client with Accelerate for database access in serverless/edge environments.
JWT authentication is handled in src/middlewares/auth.ts.
Blog and user routes are in src/routes/blog.ts and src/routes/user.ts.
Zod validation schemas are shared via a common package or defined in src/zod.ts.

---

## 🛠️ Tech Stack

Framework: Hono (Edge-first)
ORM: Prisma Edge Client
Database: PostgreSQL (Aiven / Any hosted PG)
Authentication: JWT via middleware
Deployment Platform: Cloudflare Workers

---

## 🚀 Deployment

This backend is designed for serverless/edge environments and uses the Prisma Edge Client with Accelerate for compatibility.
See wrangler.jsonc for Cloudflare Workers deployment configuration.

---

## 📚 References

Hono Documentation
Prisma Edge Client
Cloudflare Workers
Prisma Accelerate
