# E-Tailor System

## Project structure

- `Backend/` contains the Express API, route handlers, and JSON storage.
- `frontend/index.html` is the frontend entry point. It opens the existing public landing page.
- `frontend/features/` groups canonical HTML pages, styles, and scripts by feature.
- `frontend/shared/` holds scripts and styles used by multiple client workflows.
- `frontend/assets/` groups images, videos, and 3D models with their metadata.
- `docs/refactor-report.md` records the page map, compatibility routes, architecture, and checks.

## Run locally

From `Backend/`, install dependencies if needed and start the API and static frontend server:

```sh
npm start
```

Open `http://localhost:5000/`. The same Express server serves the frontend and API. Existing frontend API calls continue to use `http://localhost:5000/api`.

## API routes

The existing API paths and methods are unchanged:

- `POST /api/register`
- `POST /api/login`
- `POST /api/measurements/:userId`
- `GET /api/dashboard/:userId`

Data continues to use the JSON files in `Backend/`.
