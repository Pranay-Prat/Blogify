# ✍️ Blogify

A modern, full-stack blogging platform where curiosity meets community. Write, share, and discover stories — built with a serverless-first architecture.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?logo=react&logoColor=black)
![Hono](https://img.shields.io/badge/Hono-E36002?logo=hono&logoColor=white)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-F38020?logo=cloudflare&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📖 About

Blogify is a blogging platform designed for learners and creators. Users can sign up, write blog posts with a rich text editor, and browse a community feed of published content. The app follows a **monorepo architecture** with shared validation logic between the frontend and backend.

---

## 🏗️ Architecture

```
blogify/
├── backend/          # Hono.js API on Cloudflare Workers
├── common/           # Shared Zod validation schemas (npm package)
└── frontend/         # React + Vite SPA
```

```
┌──────────────┐      REST API       ┌──────────────────────┐      Prisma       ┌────────────┐
│  React + Vite│  ───────────────►   │  Hono.js (CF Workers)│  ──────────────►  │ PostgreSQL │
│  Frontend    │  ◄───────────────   │  Backend API         │  ◄──────────────  │ Database   │
└──────────────┘                     └──────────────────────┘                   └────────────┘
       │                                      │
       └──────────── @pranay.pratap15/blogging-common (Zod schemas) ──────────┘
```

---

## ⚙️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite, TypeScript, Tailwind CSS v4, DaisyUI v5 |
| **Rich Text Editor** | Quill.js |
| **Routing** | React Router v7 |
| **HTTP Client** | Axios |
| **Backend** | Hono.js on Cloudflare Workers |
| **ORM** | Prisma (with Prisma Accelerate for edge) |
| **Database** | PostgreSQL |
| **Auth** | JWT (hono/jwt) |


---

## ✨ Features

- **User Authentication** — Sign up and sign in with email/password, JWT-based sessions
- **Rich Text Editor** — Write blog posts with Quill.js (headings, bold, italic, code blocks, images, links)
- **Blog Feed** — Browse all published posts with author info, publish date, and estimated read time
- **Blog Detail View** — Full post page with author sidebar card
- **Rotating Quotes** — Inspirational quotes on the auth pages, fetched from an external API and rotated every 15 seconds
- **Responsive Design** — Mobile-friendly layout with Tailwind CSS
- **Shared Validation** — Zod schemas shared across frontend and backend via npm package

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero section with tagline and join CTA |
| Sign Up | `/signup` | Registration form with quote sidebar |
| Sign In | `/signin` | Login form with quote sidebar |
| Blog Feed | `/blogs` | All published posts as cards |
| Blog Post | `/blog/:id` | Full post with author info sidebar |
| Publish | `/publish` | Rich text editor to create new posts |

---

## 🗄️ Database Schema

| Model | Fields |
|-------|--------|
| **User** | `id` (UUID), `email` (unique), `name`, `password` |
| **Post** | `id` (UUID), `title`, `content`, `published`, `publishedAt`, `authorId` (FK → User) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) (for backend)
- A PostgreSQL database (e.g., [Neon](https://neon.tech/), [Supabase](https://supabase.com/))
- [Prisma Accelerate](https://www.prisma.io/accelerate) connection string

### 1. Clone the repository

```bash
git clone https://github.com/Pranay-Prat/Blogify.git
cd Blogify
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your-prisma-accelerate-connection-string"
JWT_SECRET="your-secret-key"
```

Also update `wrangler.jsonc` with the same values under `vars`.

Run Prisma migrations:

```bash
npx prisma migrate dev
npx prisma generate
```

Start the backend:

```bash
npm run dev
# Runs on http://127.0.0.1:8787
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_URL="http://127.0.0.1:8787"
```

Start the frontend:

```bash
npm run dev
# Runs on http://localhost:5173
```

### 4. Set up the common package (optional, for local dev)

```bash
cd common
npm install
npx tsc -b
```

---

## 📁 API Reference

### Auth Endpoints

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/v1/user/signup` | `{ email, password, name? }` | `{ jwt, name }` |
| POST | `/api/v1/user/signin` | `{ email, password }` | `{ jwt, name }` |

### Blog Endpoints *(require `Authorization: Bearer <jwt>` header)*

| Method | Endpoint | Body | Response |
|--------|----------|------|----------|
| POST | `/api/v1/blog` | `{ title, content }` | `{ success, id }` |
| PUT | `/api/v1/blog` | `{ id, title?, content? }` | `{ success, id }` |
| GET | `/api/v1/blog/bulk` | — | `{ blogs[], user }` |
| GET | `/api/v1/blog/:id` | — | `{ blog, user }` |

---

## 🛠️ Scripts

### Backend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server (Wrangler/Miniflare) |
| `npm run deploy` | Deploy to Cloudflare Workers |

### Frontend

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
