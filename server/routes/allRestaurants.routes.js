import { Router } from "express";
import { searchResturant } from "../controllers/allRestaurant.controller.js";
import { param } from "express-validator";

const router = Router();

router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City parameter must be a valid string"),
  searchResturant
);

export default router;
