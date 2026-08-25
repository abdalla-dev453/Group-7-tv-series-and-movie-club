# CineClub Frontend

CineClub is a React community app for discovering movies, sharing watch posts, joining clubs, and following other movie fans.

## Features

- Email authentication with protected routes
- Home and community feed views
- Movie search and movie detail pages
- Trending movies, suggested clubs, and people to follow on Discover
- Create posts about watched movies
- Ratings and reviews on posts
- Club browsing, creation, membership, and admin management
- Profile and watched-movie pages
- Responsive dark interface with amber accents

## Requirements

- Node.js 18 or newer
- npm 9 or newer
- A running CineClub backend API

## Setup

From this directory:

```bash
npm install
cp .env.example .env
npm run dev
```

Vite will print the local development URL, normally `http://localhost:5173`.

The frontend uses `VITE_API_URL` for the backend URL. The default is `http://localhost:5000`.

```env
VITE_API_URL=http://localhost:5000
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot reload |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |
| `npm test` | Run the Vitest test suite |

## Main Routes

| Route | Description | Access |
| --- | --- | --- |
| `/login` | Sign in | Public |
| `/signup` | Create an account | Public |
| `/` | Home | Protected |
| `/feed` | Community feed | Protected |
| `/discover` | Trending movies, clubs, and people | Protected |
| `/movies` | Search movies | Protected |
| `/movies/:tmdbId` | Movie details | Protected |
| `/clubs` | Browse clubs | Protected |
| `/clubs/new` | Create a club | Protected |
| `/clubs/:id` | View a club | Protected |
| `/clubs/:id/manage` | Manage a club | Club admin only |
| `/posts/new` | Create a watch post | Protected |
| `/posts/:id` | View a post and reviews | Protected |
| `/profile/:id` | View a profile | Protected |
| `/watched` | View watched movies | Protected |

## Validation

Before opening a pull request, run:

```bash
npm run build
npm run lint
npm test
```

Tests use Vitest, Testing Library, and a JSDOM environment configured in `vite.config.js` and `src/setupTests.js`.

<!-- End of README -->





