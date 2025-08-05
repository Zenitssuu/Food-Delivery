import { Restaurant } from "../models/resturant.model.js";
import redisClient from "../services/redisClient.js";

export const searchRestaurant = async (req, res) => {
  try {
    const city = req.params.city;
    // console.log(req.query);

    const searchQuery = req.query.searchQuery?.toString() || "";
    const selectedCuisines = req.query.selectedCuisines?.toString() || "";
    const sortOption = req.query.sortOption?.toString() || "lastUpdated";
    const page = parseInt(req.query.page?.toString()) || 1;

    let query = {};
    query["city"] = new RegExp(city, "i");
    const cityCheck = await Restaurant.countDocuments(query);

    const cacheKey = `search_${city}_${searchQuery}_${selectedCuisines}_${sortOption}_p${page}`;

    let cacheData;

    try {
      cacheData = await redisClient.get(cacheKey);

      if (cacheData) {
        console.log("Using data from cache");
        return res.status(200).json(JSON.parse(cacheData));
      }
    } catch (error) {
      console.log("error while checking restaurants in cache");
      // throw new Error(error);
    }

    if (cityCheck === 0) {
      return res
        .status(404)
        .json({ data: [], pagination: { total: 0, page: 1, pages: 1 } });
    }

    const cityRestCount = cityCheck > 0;

    if (selectedCuisines) {
      //URL = selected cuisines, such as indian, chinese etc
      const cuisineArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      // console.log("cuisines", cuisineArray);

      query["cuisines"] = { $in: cuisineArray };
    }

    if (searchQuery) {
      const searchRegex = new RegExp(searchQuery, "i");
      // console.log("query",searchRegex);
      query["$or"] = [
        { restaurantName: searchRegex },
        {
          cuisines: { $in: [searchRegex] },
        },
      ];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    const restaurants = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: { restaurants: restaurants, cityCheck: cityCheck },
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    //caching data to redis
    try {
      await redisClient.setEx(cacheKey, 600, JSON.stringify(response));
    } catch (error) {
      console.log("error while caching data");
      // throw new Error(error);
    }

    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const getRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ messgae: "something went wrong" });
  }
};
