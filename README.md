# e-Tailor System

## Project layout

- HTML pages stay at the project root so existing page links and query-string routes remain unchanged.
- `styles/` contains the page and shared stylesheets.
- `scripts/` contains frontend behavior, including the shared customer and admin dashboard scripts.
- `assets/` contains images, video, and 3D models used by the pages.
- `Backend/server.js` configures the API; `Backend/routes/` contains endpoint groups and `Backend/utils/` contains shared JSON storage helpers.

## Run the API

From the `Backend` directory, install its dependencies if needed and run:

```sh
npm start
```

The API listens on `http://localhost:5000`.
