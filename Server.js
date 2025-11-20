require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connectDB");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const uploadRoutes = require("./routes/UploadRoutes");
const subscriberRoutes = require("./routes/SubscriberRoute");
const AdminRoutes = require("./routes/AdminRoutes");
const productAdminRoutes = require("./routes/ProductAdminRoute");
const adminOrderRoutes = require("./routes/AdminOrderRoutes");

const app = express();

// --- CORS CONFIG ---

app.use(
  cors({
    origin: "https://storied-rabanadas-5dde43.netlify.app", 
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

app.use("/api/Admin/users", AdminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// --- Export for Vercel ---
module.exports = app;

// --- Local Development ---
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 9000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
