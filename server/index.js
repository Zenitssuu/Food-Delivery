import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./db/index.js";
import {
  userRoutes,
  resturantRoutes,
  orderRoutes,
  allRestaurantRoutes,
  checkDistanceRoute,
} from "./routes/routes.js";
import redisClient from "./services/redisClient.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
const PORT = process.env.PORT;

//middlewares
// app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(
  "/api/v1/order/checkout/webhook",
  express.raw({ type: "application/json" })
);
app.use(express.json());

// console.log(process.env.AUTH0_AUDIENCE);
// console.log(process.env.AUTH0_ISSUER_BASE_URL);

app.use("/api/v1/distance", checkDistanceRoute);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", resturantRoutes);
app.use("/api/v1/allrestaurants", allRestaurantRoutes);
app.use("/api/v1/order", orderRoutes);

connectDB()
  .then(async () => {
    await redisClient.connect();

    app.listen(PORT, () => {
      console.log("running on port ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
