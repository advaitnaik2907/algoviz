# AlgoViz — Algorithm Visualizer

AlgoViz is a full-stack web application for **learning algorithms visually**. Users watch sorting and searching algorithms run step by step, read a short lesson for each algorithm, take a quiz, and track their progress on a personal dashboard.

## Features

- **Algorithm Visualizer** — animated, step-by-step visualization with speed control and a colour legend
- **8 algorithms**
  - Sorting: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort
  - Searching: Linear Search, Binary Search
- **Learn pages** — explanation, complexity and key ideas for every algorithm
- **Quizzes** — 8 quizzes with 80 questions in total, automatic scoring, saved attempts and a quiz library showing your best score
- **Quiz history** — every attempt you have made
- **Progress and Dashboard** — personal statistics based on your quiz attempts
- **Authentication** — sign up, log in and log out with JWT; quiz, progress and dashboard pages are protected
- **Dark theme** and a responsive layout

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router, CSS |
| Backend | Java 21, Spring Boot, Spring Security, Spring Data JPA (Hibernate) |
| Authentication | JWT (JSON Web Tokens), BCrypt password hashing |
| Database | MySQL 8 |
| Containers | Docker, Docker Compose, Nginx |

## Architecture

```text
 Browser
    │
    ▼
 React + Vite  (served by Nginx in Docker)
    │   REST + JSON, Authorization: Bearer <token>
    ▼
 Spring Boot REST API
    │   Spring Data JPA / Hibernate
    ▼
 MySQL
```

### Project structure

```text
Algorithm-Visualizer/
├── backend/                 Spring Boot application
│   ├── src/main/java/...    controllers, services, entities, security
│   ├── src/main/resources/  application.properties (reads environment variables)
│   └── Dockerfile
├── frontend/                React application
│   ├── src/                 pages, components, algorithms, utils
│   ├── nginx.conf
│   └── Dockerfile
├── docker-compose.yml       runs MySQL + backend + frontend together
└── .env.example             settings needed for Docker
```

## API Overview

Only the `/api/auth/**` endpoints are public. Every other endpoint needs the header `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Create an account |
| POST | `/api/auth/login` | Log in and receive a JWT |
| GET | `/api/quizzes` | Quiz library with the user's attempts and best score |
| GET | `/api/quizzes/{algorithm}` | Questions for one quiz |
| POST | `/api/quizzes/{quizId}/submit` | Submit answers and get the score |
| GET | `/api/quizzes/attempts/history` | The user's quiz attempt history |
| GET | `/api/progress` | Learning progress |
| GET | `/api/dashboard` | Dashboard summary |

## Running the Project

### Option 1 — Docker (easiest)

Requires [Docker Desktop](https://www.docker.com/products/docker-desktop/).

1. Copy `.env.example` to `.env` in the project root and set the two values:
   ```env
   MYSQL_ROOT_PASSWORD=choose-a-password
   JWT_SECRET=a-random-text-of-at-least-32-characters
   ```
2. Start everything:
   ```bash
   docker compose up --build
   ```
3. Open **http://localhost:3000** and create an account.

Stop with `Ctrl + C`, then `docker compose down`.

### Option 2 — Run locally without Docker

Requires Java 21, Node.js 22 and MySQL 8.

**Backend**

1. Create a database called `algoviz_db` in MySQL.
2. Copy `backend/.env.example` to `backend/.env` and fill in your values (database password, `JWT_SECRET` of at least 32 characters).
3. Start the backend:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   It runs on **http://localhost:8080**. The quizzes are created automatically on first start.

**Frontend**

1. Copy `frontend/.env.example` to `frontend/.env`.
2. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   It runs on **http://localhost:5173**.

## Configuration

Secrets are never stored in the code. They are read from environment variables.

| Variable | Used by | Purpose |
|---|---|---|
| `DB_URL` | backend | JDBC address of the MySQL database |
| `DB_USERNAME` | backend | Database user |
| `DB_PASSWORD` | backend | Database password |
| `JWT_SECRET` | backend | Key used to sign tokens (at least 32 characters) |
| `CORS_ALLOWED_ORIGINS` | backend | Frontend address(es) allowed to call the API, comma separated |
| `VITE_API_URL` | frontend | Address of the backend API |

Real `.env` files are listed in `.gitignore` and must never be committed.

## Security Notes

- Passwords are stored as BCrypt hashes.
- The API is stateless and protected by JWT; tokens expire after 24 hours by default.
- CORS only allows the configured frontend address.
- The frontend sends logged-out visitors from protected pages to the login page.

## Future Scope

- More algorithms (graph algorithms, dynamic programming)
- Code view that highlights the running line
- Leaderboards and achievements
- Light theme
- Automated tests for the API and the frontend

## Conclusion

AlgoViz combines visualization, explanation and practice in one place, and demonstrates a complete full-stack workflow: a React interface, a secured Spring Boot REST API, a relational database and a Docker-based setup.
