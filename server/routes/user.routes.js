import express, { Router } from "express";
import { createUser, getUser, updateUser } from "../controllers/user.controller.js";
import { jwtCheck, jwtParse } from "../middlewares/auth.js";
import { validateUserReq } from "../middlewares/validation.js";

const router = Router();

router.post("/create-user", jwtCheck, createUser);

router.post("/update-user", jwtCheck, jwtParse, validateUserReq, updateUser);

router.get("/get-user",jwtCheck,jwtParse,getUser);

export default router;
