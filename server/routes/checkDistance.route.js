// routes/distance.js
import express from "express";
import axios from "axios";
import redisClient from "../services/redisClient.js";

const router = express.Router();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

router.get("/", async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination required" });
  }
  // console.log(origin, destination);
  try {
    const cacheKey = `${origin}to${destination}`;
    let distance;
    try {
      distance = await redisClient.get(cacheKey);
      if (distance) {
        console.log("sending data from cache");
        return res.status(200).json(JSON.parse(distance));
      }
    } catch (error) {
      console.log("error while getting distance from cache");
      // throw new Error(error);
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    distance = response.data.rows[0].elements[0].distance.value / 1000;

    try {
      await redisClient.setEx(cacheKey, 60, JSON.stringify(distance));
    } catch (error) {
      console.log("error while saving distance in cache");
      // throw new Error(error);
    }

    return res.status(200).json({ distance });
  } catch (error) {
    console.error("Google Maps error:", error);
    return res.status(500).json({ error: "Failed to fetch distance" });
  }
});

export default router;
