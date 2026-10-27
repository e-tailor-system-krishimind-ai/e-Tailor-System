# Feature refactor report

## Final structure

- `Backend/` remains an independent Express API and JSON storage layer.
- `frontend/index.html` is the public frontend entry point and directs to the existing `newlanding_pg.html` experience.
- `frontend/features/<feature>/pages/` contains canonical application pages; page-specific styles and scripts live beside their owning feature.
- `frontend/shared/` contains `auth.js`, `Clnt_dashboad.js`, `client-dashboard.js`, and `Clnt_dashboad.css`, which are used by multiple client pages.
- `frontend/assets/images/`, `videos/`, and `models/` contain all frontend media. Model JSON metadata remains beside its corresponding GLB files.
- `docs/` holds migration documentation. There is no root-level production HTML or legacy `scripts/`, `styles/`, `assets/`, or `second form/` directory.

## Canonical page map

| Feature | Canonical pages under `frontend/features/<feature>/pages/` |
| --- | --- |
| Authentication | `login_pg.html`, `Registration_pg.html`, `admin_login.html`, `flip-auth.html` |
| Landing | `landing-dashboard.html`, `newlanding_pg.html`, `demo.html` |
| Admin | `admin-dashboard.html`, `admin-clients.html`, `admin-costing.html`, `admin-fabrics.html`, `admin-measurements.html`, `admin-orders.html`, `admin-reports.html`, `admin-settings.html` |
| Client dashboard | `Clnt_dashboad.html` |
| Measurements | `measurements.html`, `gemmeasure_body.html`, `gptmeasure_body.html`, `form.html` (formerly `second form/form.html`) |
| Garments | `blouse.html`, `blouse_design.html`, `kurti.html`, `womens_kurti.html`, `shirt.html`, `mens_shirt.html`, `suit.html`, `mens_suit.html`, `pant.html`, `form1.html` |
| Orders | `orders.html`, `new_order.html`, `view-order.html` |
| Payments | `payments.html` |
| Profile | `profile.html` |
| Virtual try-on | `vr_try.html`, `handgest.html`, `demo2.html` |

`form1.html` is grouped under garments because it selects a garment category and links into the garment pages. `landing-dashboard.html` and `newlanding_pg.html` remain distinct experiences. `demo.html` and `demo2.html` remain separate landing and try-on experiments.

## Styles and scripts

- Authentication, landing, admin, garment, and measurement styles/scripts are under their respective feature folders.
- `style1.css` remains with garments; the category-selection `form1.html` shares it with garment selection pages.
- `second-form.css` and `second-form.js` remain together under measurements.
- `auth.js`, `Clnt_dashboad.js`, `client-dashboard.js`, and `Clnt_dashboad.css` remain shared because client navigation and dashboard behavior/styles are used across dashboard, orders, measurements, payments, profile, and try-on pages.
- `client-dashboard.js` and `Clnt_dashboad.js` are distinct files and were preserved separately.

## Serving and compatibility

`Backend/server.js` serves `frontend/` at `/` after mounting the existing API routers. The frontend entry is `/`; canonical pages use `/features/<feature>/pages/<filename>`. Feature pages resolve assets from the frontend root using their base element.

The server redirects old root HTML URLs to their canonical pages, including `/second%20form/form.html`, preserving query strings. These are server redirects; duplicate root HTML source files are not retained. Static hosting that bypasses Express will serve canonical feature URLs and `/`, but will not provide the legacy redirects.

The image, video, and model filenames and extensions are unchanged. Images are under `frontend/assets/images/`, video under `frontend/assets/videos/`, and GLB/JSON model files under `frontend/assets/models/`. No fonts were present. `Backend/users.json` and `Backend/firebaseKey.json` remain outside the publicly served frontend.

The API paths, methods, request/response contracts, route handlers, JSON storage, and both package manifests/lockfiles are unchanged. No deployment workflow was present in this project.

## Verification and limits

- All 38 canonical page files were reconciled against prior root redirect stubs; those stubs contained only redirects and no page-specific behavior.
- Static audit checked 257 HTML resource references and found no missing local targets.
- Static audit checked 5 CSS asset references and found no missing local targets.
- All 38 Express legacy redirect destinations exist.
- No root-level HTML pages or obsolete root `scripts/`, `styles/`, `assets/`, or `second form/` directories remain.
- `node --check` passed for `Backend/server.js` and all eight frontend JavaScript files. `git diff --check` passed.
- Backend startup emitted its expected server message. An in-process HTTP smoke check was attempted, but the sandbox denied loopback connections with `EPERM`; HTTP statuses and API responses could not be verified here.
- Browser workflows such as login, registration, measurement submission, order creation, and virtual try-on were not exercised.
- `npm test` is a placeholder that exits with an error; it was not run and no test suite was added.
