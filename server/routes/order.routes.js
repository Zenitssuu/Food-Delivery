import { Router } from "express";

import { jwtCheck, jwtParse } from "../middlewares/auth.js";
import { createCheckoutSession, stripeWebhookHandler } from "../controllers/order.controller.js";

const router = Router();

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  createCheckoutSession
 );

 router.post("/checkout/webhook",stripeWebhookHandler)

export default router;
