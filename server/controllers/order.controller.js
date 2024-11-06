import Stripe from "stripe";
import { Restaurant } from "../models/resturant.model.js";
import { Order } from "../models/order.model.js";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export const getOrder = async (req, res) => {
  try {
    const order = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    if (!order) {
      throw new Error("order not found");
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

export const stripeWebhookHandler = async (req, res) => {
  let event;
  try {
    const sign = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sign,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (error) {
    console.log(error);
    return res.status(400).json(`webhook error ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }

    order.totalAmount = event.data.object.amount_total / 100;
    order.status = "paid";

    await order.save();
  }

  return res.status(200).send();
};

export const createCheckoutSession = async (req, res) => {
  try {
    // console.log(req.body);

    const checkoutSessionReq = req.body;

    const restaurant = await Restaurant.findById(
      checkoutSessionReq.restaurantId
    );

    if (!restaurant) {
      throw new Error("restaurant not found");
    }

    // console.log(checkoutSessionReq.deliverDetails);
    // console.log(checkoutSessionReq.cartItems);

    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionReq.deliveryDetails,
      cartItems: checkoutSessionReq.cartItems,
      createdAt: new Date(),
    });

    const lineItems = creasteLineItems(
      checkoutSessionReq,
      restaurant.menuItems
    );

    // console.log("lines item ", lineItems);

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) {
      return res.status(500).json({ message: "error creating stripe session" });
    }

    await newOrder.save();

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: error.raw?.message || error.message });
  }
};

const creasteLineItems = (checkoutSessionReq, menuItems) => {
  // 1. for each cart item get the menu item object from the restauran for price

  // 2. for each cart item, convert it to a stripe line item
  // 3. return line item array

  const lineItems = checkoutSessionReq.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );
    const unitAmountInPaise = Math.round(menuItem?.price * 100);
    if (!menuItem) {
      throw new Error(`menu item is not found: ${cartItem.menuItemId}`);
    }

    const line_item = {
      price_data: {
        currency: "inr",
        unit_amount: unitAmountInPaise,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return line_item;
  });
  return lineItems;
};

const createSession = async (
  lineItems,
  orderId,
  deliveryPrice,
  restaurantId
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice * 100,
            currency: "inr",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    // success_url: `${FRONTEND_URL}/order-status?success=true`,
    // cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    success_url: `${FRONTEND_URL}/order-status`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}`,
  });

  return sessionData;
};
