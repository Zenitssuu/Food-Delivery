// routes/distance.js
import express from "express";
import axios from "axios";

const router = express.Router();

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

router.get("/", async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination required" });
  }
  console.log(origin, destination);
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    const distance = response.data.rows[0].elements[0].distance.value / 1000;

    return res.status(200).json({ distance });
  } catch (error) {
    console.error("Google Maps error:", error);
    return res.status(500).json({ error: "Failed to fetch distance" });
  }
});

export default router;
