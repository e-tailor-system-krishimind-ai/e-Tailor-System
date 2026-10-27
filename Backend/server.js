const path = require("path");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const measurementRoutes = require("./routes/measurements");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
const frontendRoot = path.resolve(__dirname, "../frontend");

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", measurementRoutes);
app.use("/api", dashboardRoutes);

// Keep old public page URLs available without keeping duplicate HTML source files.
const legacyPages = {
  "/Clnt_dashboad.html": "/features/client-dashboard/pages/Clnt_dashboad.html",
  "/Registration_pg.html": "/features/authentication/pages/Registration_pg.html",
  "/admin_login.html": "/features/authentication/pages/admin_login.html",
  "/admin-clients.html": "/features/admin/pages/admin-clients.html",
  "/admin-costing.html": "/features/admin/pages/admin-costing.html",
  "/admin-dashboard.html": "/features/admin/pages/admin-dashboard.html",
  "/admin-fabrics.html": "/features/admin/pages/admin-fabrics.html",
  "/admin-measurements.html": "/features/admin/pages/admin-measurements.html",
  "/admin-orders.html": "/features/admin/pages/admin-orders.html",
  "/admin-reports.html": "/features/admin/pages/admin-reports.html",
  "/admin-settings.html": "/features/admin/pages/admin-settings.html",
  "/blouse.html": "/features/garments/pages/blouse.html",
  "/blouse_design.html": "/features/garments/pages/blouse_design.html",
  "/demo.html": "/features/landing/pages/demo.html",
  "/demo2.html": "/features/virtual-try-on/pages/demo2.html",
  "/flip-auth.html": "/features/authentication/pages/flip-auth.html",
  "/form1.html": "/features/garments/pages/form1.html",
  "/gemmeasure_body.html": "/features/measurements/pages/gemmeasure_body.html",
  "/gptmeasure_body.html": "/features/measurements/pages/gptmeasure_body.html",
  "/handgest.html": "/features/virtual-try-on/pages/handgest.html",
  "/kurti.html": "/features/garments/pages/kurti.html",
  "/landing-dashboard.html": "/features/landing/pages/landing-dashboard.html",
  "/login_pg.html": "/features/authentication/pages/login_pg.html",
  "/measurements.html": "/features/measurements/pages/measurements.html",
  "/mens_shirt.html": "/features/garments/pages/mens_shirt.html",
  "/mens_suit.html": "/features/garments/pages/mens_suit.html",
  "/new_order.html": "/features/orders/pages/new_order.html",
  "/newlanding_pg.html": "/features/landing/pages/newlanding_pg.html",
  "/orders.html": "/features/orders/pages/orders.html",
  "/pant.html": "/features/garments/pages/pant.html",
  "/payments.html": "/features/payments/pages/payments.html",
  "/profile.html": "/features/profile/pages/profile.html",
  "/shirt.html": "/features/garments/pages/shirt.html",
  "/suit.html": "/features/garments/pages/suit.html",
  "/view-order.html": "/features/orders/pages/view-order.html",
  "/vr_try.html": "/features/virtual-try-on/pages/vr_try.html",
  "/womens_kurti.html": "/features/garments/pages/womens_kurti.html",
  "/second form/form.html": "/features/measurements/pages/form.html"
};

app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();

  let requestPath = req.path;
  try {
    requestPath = decodeURIComponent(requestPath);
  } catch (_error) {
    return next();
  }

  const destination = legacyPages[requestPath];
  if (!destination) return next();

  const queryIndex = req.originalUrl.indexOf("?");
  const query = queryIndex === -1 ? "" : req.originalUrl.slice(queryIndex);
  return res.redirect(302, `${destination}${query}`);
});

app.use(express.static(frontendRoot));

app.listen(5000, () =>
  console.log("✅ E-Tailor frontend and API running on http://localhost:5000")
);
