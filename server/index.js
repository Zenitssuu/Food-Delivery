import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "./db/index.js";
import { userRoutes, resturantRoutes } from "./routes/routes.js";

import allRestaurantsRoutes from "./routes/allRestaurants.routes.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
console.log(process.env.AUTH0_AUDIENCE);
console.log(process.env.AUTH0_ISSUER_BASE_URL);

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", resturantRoutes);
app.use("/api/v1/allrestaurants", allRestaurantsRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("running on port ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
