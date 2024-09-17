const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const globalErrorFeature = require("./Controllers/globalErrorController");
const authRouter = require("./Routes/authRoutes");
const CustomError = require("./Utils/customError");
const productsRoute = require("./Routes/productRoutes");
const dashboardRoute = require("./Routes/dashboardProductsRoute");
const cartRoute = require("./Routes/cartRoutes");
const addressRoute = require("./Routes/addressRoutes");
const orderRoute = require("./Routes/orderRoutes");
const adminOrderRoutes = require("./Routes/adminOrderRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/admin/products/", productsRoute);
app.use("/dashboard/products", dashboardRoute);
app.use("/dashboard/cart", cartRoute);
app.use("/dashboard/address", addressRoute);
app.use("/dashboard/order", orderRoute);
app.use("/admin/orders", adminOrderRoutes);
app.use("/dashboard/reviews",reviewRoutes);

app.use("*", (req, res, next) => {
  const error = new CustomError(`Invalid Endpoint ${req.originalUrl}`, 404);
  next(error);
});

app.use(globalErrorFeature);

module.exports = app;
