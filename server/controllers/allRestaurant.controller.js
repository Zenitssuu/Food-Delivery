import { Restaurant } from "../models/resturant.model.js";

export const searchResturant = async (req, res) => {
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

    if (cityCheck === 0) {      
      return res
        .status(404)
        .json({ data: [], pagination: { total: 0, page: 1, pages: 1 } });
    }

    if (selectedCuisines) {
      //URL = selected cuisines, such as indian, chinese etc
      const cuisineArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      // console.log("cuisines",cuisineArray);
      

      query["cuisines"] = { $all: cuisineArray };
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
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};
