import { createClient } from "redis";
import dotenv from "dotenv"
dotenv.config();

const redisClient = createClient({
  username: "default",
  password: `${process.env.REDIS_CLIENT_PASSWORD}`,
  socket: {
    host: `${process.env.REDIS_HOST_URL}`,
    port: process.env.REDIS_PORT,
  },
});

redisClient.on("error", (err) => console.log("redis error", err));

export default redisClient;
