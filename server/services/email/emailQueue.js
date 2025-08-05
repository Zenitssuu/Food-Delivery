import { Queue } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

export const emailQueue = new Queue("email-queue", {
  connection: {
    host: process.env.REDIS_HOST_URL,
    port: Number(process.env.REDIS_PORT), // ✅ safer and correct
    username: "default",
    password: process.env.REDIS_CLIENT_PASSWORD,
  },
});

emailQueue.on("error",(err) => console.log("error in email queue",err))
