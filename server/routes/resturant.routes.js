import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import {
  createResturant,
  getRestaurant,
  updateResturant,
} from "../controllers/resturant.controller.js";
import { jwtCheck, jwtParse } from "../middlewares/auth.js";
import { validateResturantReq } from "../middlewares/validation.js";

const router = Router();

router.post(
  "/create-restaurant",
  upload.single("imageFile"),
  validateResturantReq,
  jwtCheck,
  jwtParse,
  createResturant
);

router.get("/get-restaurant", jwtCheck, jwtParse, getRestaurant);

router.put(
  "/update-restaurant",
  upload.single("imageFile"),
  validateResturantReq,
  jwtCheck,
  jwtParse,
  updateResturant
);

export default router;
