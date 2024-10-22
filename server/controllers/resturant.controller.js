import mongoose from "mongoose";
import { Restaurant } from "../models/resturant.model.js";
import { v2 as cloudinary } from "cloudinary";

const createResturant = async (req, res) => {
  try {
    // console.log(req.body);

    // const { userId } = req.body;
    // console.log(req.userId);

    const exists = await Restaurant.findOne({ user: req.userId });

    if (exists) {
      return res.status(409).json({ message: "user resturant already exists" });
    }

    const image = req.file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataUri = `data:${image.mimetype};base64,${base64Image}`;

    const uploadResp = await cloudinary.uploader.upload(dataUri);

    const resturant = new Restaurant(req.body);
    resturant.imageUrl = uploadResp.url;

    resturant.user = new mongoose.Types.ObjectId(req.userId);

    resturant.lastUpdated = new Date();
    await resturant.save();

    return res.status(201).send(resturant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "resturant not found" });
    }

    return res.status(200).json( restaurant );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export { createResturant, getRestaurant };
