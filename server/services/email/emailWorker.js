import { Worker } from "bullmq";
import { sendEmail } from "./emailProcessor.js";
import dotenv from "dotenv";
dotenv.config();
// console.log(Number(process.env.REDIS_PORT))

export const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    await sendEmail(job.data);
  },
  {
    connection: {
      host: process.env.REDIS_HOST_URL,
      port: Number(process.env.REDIS_PORT),
      username: "default",
      password: process.env.REDIS_CLIENT_PASSWORD,
    },
    settings: {
      retryProcessDelay: 10000,
      lockDuration: 60000, // 60 seconds (default is 30s)
    },
    attempts: 2,
  }
);

emailWorker.on("ready", () => {
  console.log("Email worker connected to Redis and ready to process jobs.");
});

// Optional: log when job is done or fails
emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed.`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});
