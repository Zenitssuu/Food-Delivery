import mongoose from "mongoose";
import { Restaurant } from "../models/resturant.model.js";
import { Order } from "../models/order.model.js";
import { v2 as cloudinary } from "cloudinary";
import redisClient from "../services/redisClient.js";


const createResturant = async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);

    // const { userId } = req.body;
    // console.log(req.userId);

    const exists = await Restaurant.findOne({ user: req.userId });

    if (exists) {
      return res.status(409).json({ message: "user resturant already exists" });
    }

    const restaurant = new Restaurant(req.body);

    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      restaurant.imageUrl = imageUrl;
    }

    restaurant.user = new mongoose.Types.ObjectId(req.userId);

    restaurant.lastUpdated = new Date();
    await restaurant.save();

    const city = restaurant.city?.toLowerCase();

    if (city) {
      const cacheKeyPattern = `search_${city}_*`;
      const keys = await redisClient.keys(cacheKeyPattern);

      if (keys.length > 0) {
        try {
          await Promise.all(keys.map((key) => redisClient.del(key)));
          console.log("deleted all previous cache");
        } catch (error) {
          console.log("error in deleting cache");
          // throw new Error(error);
        }
      }
    }

    return res.status(201).send(restaurant);
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

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const updateResturant = async (req, res) => {
  try {
    // console.log(req.file);

    const restaurant = await Restaurant.findOne({
      user: req.userId,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.menuItems = req.body.menuItems;
    restaurant.cuisines = req.body.cuisines;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageUrl = await uploadImage(req.file);
      restaurant.imageUrl = imageUrl;
    }

    await restaurant.save();

    const city = restaurant.city?.toLowerCase();

    if (city) {
      const cacheKeyPattern = `search_${city}_*`;
      const keys = await redisClient.keys(cacheKeyPattern);

      if (keys.length > 0) {
        try {
          await Promise.all(keys.map((key) => redisClient.del(key)));
          console.log("deleted all previous cache");
        } catch (error) {
          console.log("error in deleting cache");
          // throw new Error(error);
        }
      }
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const getRestaurantOrder = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "restaurant not found" });
    }

    const cacheKey = `orders:${restaurant._id}`;

    let cacheOrders;
    try {
      cacheOrders = await redisClient.get(cacheKey);
      if (cacheOrders) {
        console.log("Returning orders from cache");
        return res.status(200).json(JSON.parse(cacheOrders));
      }
    } catch (error) {
      console.log("error in getting orders data from cache");
      // throw new Error(error);
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    //caching only if there are orders, not caching if orders are not present
    if (orders.length > 0) {
      await redisClient.setEx(cacheKey, 600, JSON.stringify(orders));
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const updateRestaurantOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    // console.log(req.body);

    const { status } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    const restaurant = await Restaurant.findById(order.restaurant);

    if (restaurant?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

const uploadImage = async (file) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataUri = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResp = await cloudinary.uploader.upload(dataUri);

  return uploadResp.url;
};

export {
  createResturant,
  getRestaurant,
  updateResturant,
  getRestaurantOrder,
  updateRestaurantOrderStatus,
};
