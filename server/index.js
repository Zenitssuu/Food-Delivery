import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

import { connectDB } from "./db/index.js";

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("running on port ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
