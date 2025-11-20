require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");

// Import routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const uploadRoutes = require("./routes/UploadRoutes");
const subscriberRoutes = require("./routes/SubscriberRoute");
const adminRoutes = require("./routes/AdminRoutes");
const productAdminRoutes = require("./routes/ProductAdminRoute");
const adminOrderRoutes = require("./routes/AdminOrderRoutes");

const app = express();

// --- CORS Configuration ---
const FRONTEND_URL = process.env.FRONTEND_URL || "https://storied-rabanadas-5dde43.netlify.app";

app.use(
  cors({
    origin: FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// --- Middleware ---
app.use(express.json());

// --- Connect to MongoDB ---
connectDB();

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("Welcome to Rabbit API");
});

// --- API Routes ---
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/subscribe", subscriberRoutes);

app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// --- Error Handling Middleware ---
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- Export for Vercel ---
module.exports = app;

// --- Local Development ---
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
