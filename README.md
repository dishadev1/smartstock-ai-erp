# SmartStock AI ERP

An AI-powered Inventory, Procurement & Supply Chain ERP for businesses in the USA, UK and Canada.
Portfolio project, built in small, verified milestones. All business data is fictional.

## Current status: Milestone 1 (foundation)

| Area | Status |
| --- | --- |
| React + Vite frontend (Tailwind CSS, Lucide icons) | Done |
| Express API with `GET /api/health` | Done, 4 automated tests passing |
| Authentication, PostgreSQL, inventory, procurement, sales, AI | Not started |

## Tech stack

- **Frontend:** React 19, Vite 8, Tailwind CSS 4, Lucide React (JavaScript / JSX)
- **Backend:** Node.js, Express 5 (JavaScript, ES modules)
- **Testing:** Vitest + Supertest
- **Planned:** PostgreSQL + Prisma, local LLM via Ollama

## Prerequisites

- **Node.js 20.19 or newer.** Node 22 or 24 LTS is recommended, because Node 20 is end-of-life.
- **Any npm version.** The project pins its own npm version for installs (see below), so you
  don't need to upgrade npm globally, and your other projects are not affected.

### Why installs use a pinned npm (npm 11.21.1)

npm 10.9.x crashes when it installs this project's packages
(`Cannot read properties of null (reading 'edgesOut')`). npm 11 works fine. Instead of
upgrading npm on the whole machine, the install scripts run npm 11.21.1 through `npx`
for this project only. `npx` downloads it once and caches it.

- **Installing:** use the root scripts (`npm run install:all`, `npm run install:server`,
  `npm run install:client`). Don't run a plain `npm install` inside `client/` or `server/`.
- **Adding a new package:** run this from the project root, choosing the right folder:
  ```bash
  npx -y npm@11.21.1 install <package-name> --prefix server
  npx -y npm@11.21.1 install -D <package-name> --prefix client   # -D = dev-only tool
  ```
- **Everything else** (`npm run dev:server`, `npm test`, and so on) works with any npm version.

## Getting started

```bash
# 1. Install dependencies for both apps (from the project root, uses the pinned npm 11.21.1)
npm run install:all

# 2. Optional: create a local config file for the API (the defaults work without it)
cp server/.env.example server/.env

# 3. Start the API (terminal 1): http://localhost:4000
npm run dev:server

# 4. Start the frontend (terminal 2): http://localhost:5173
npm run dev:client
```

Open http://localhost:5173. The **System status** card should show **Operational**.
If it shows **Unreachable**, the API is not running.

In development, Vite forwards every `/api/...` request to the API on port 4000
(see `client/vite.config.js`). The browser therefore talks to a single origin, and no
server address or secret is stored in frontend code.

## Useful commands (run from the project root)

| Command | What it does |
| --- | --- |
| `npm run dev:server` | Start the API with auto-restart on file changes (`node --watch`) |
| `npm run dev:client` | Start the Vite dev server with hot reload |
| `npm test` | Run the API test suite (Vitest + Supertest) |
| `npm run lint` | Lint the frontend (oxlint) |
| `npm run build` | Production build of the frontend into `client/dist` |

## Project structure

```
├── client/                      React frontend
│   ├── src/
│   │   ├── api/client.js        fetch wrapper for calling /api
│   │   ├── components/          reusable UI components
│   │   ├── App.jsx              app shell
│   │   └── main.jsx             entry point
│   └── vite.config.js           Tailwind plugin + /api dev proxy
├── server/                      Express API (modular monolith)
│   ├── src/
│   │   ├── app.js               builds the Express app (used by tests)
│   │   ├── server.js            starts the HTTP server
│   │   ├── config/env.js        all environment settings in one place
│   │   ├── routes/index.js      mounts each module under /api
│   │   ├── middleware/          404 and error handlers
│   │   └── modules/<module>/    routes -> controller -> service per business area
│   ├── tests/                   API tests
│   └── .env.example             template for server/.env
└── package.json                 convenience scripts only (no dependencies)
```

Each business area (inventory, procurement, sales, and so on) gets its own folder under
`server/src/modules/`, split into the same layers:

- **routes:** URL and HTTP method
- **controller:** reads the request and sends the response
- **service:** business logic, and later the database calls
