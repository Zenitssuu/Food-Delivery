import { Router } from "express";
import { getRestaurant, searchRestaurant } from "../controllers/allRestaurant.controller.js";
import { param } from "express-validator";

const router = Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchRestaurant
);

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurantId parameter must be a valid string"),
    getRestaurant
);

export default router;
