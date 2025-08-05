import Stripe from "stripe";
import { Restaurant } from "../models/resturant.model.js";
import { Order } from "../models/order.model.js";
import redisClient from "../services/redisClient.js";
import { User } from "../models/user.model.js";
import { emailQueue } from "../services/email/emailQueue.js";

import dotenv from "dotenv";
dotenv.config();

const STRIPE = new Stripe(process.env.STRIPE_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

const getOrderConfirmationHtml = (userName, orderId, totalAmount) => {
  const formattedTotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(totalAmount);

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Your EasyEats Order is Confirmed!</title>
        <style>
            /* Base Styles */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
            img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
            body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f1f3f6; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; }
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
        </style>
    </head>
    <body style="background-color: #f1f3f6; margin: 0 !important; padding: 0 !important;">

        <!-- PREHEADER TEXT -->
        <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
            Great choice! Your delicious meal is on its way.
        </div>

        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- MAIN CONTENT WRAPPER -->
            <tr>
                <td align="center" style="padding: 20px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        
                        <!-- HEADER: LOGO -->
                        <tr>
                            <td align="center" style="padding: 20px 0;">
                                <h1 style="font-size: 32px; font-weight: 700; color: #FF6347; margin: 0;">EasyEats</h1>
                            </td>
                        </tr>

                        <!-- MAIN CARD -->
                        <tr>
                            <td align="center" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 40px;">
                                    
                                    <!-- ICON/IMAGE -->
                                    <tr>
                                      <td align="center" style="padding-bottom: 20px;">
                                        <img src="https://i.ibb.co/c8L42gJ/check-icon.png" alt="Order Confirmed" width="60">
                                      </td>
                                    </tr>

                                    <!-- HEADING -->
                                    <tr>
                                        <td align="center" style="padding-bottom: 20px;">
                                            <h2 style="font-size: 28px; font-weight: 600; color: #212529; margin: 0;">Thanks for your order, ${userName}!</h2>
                                        </td>
                                    </tr>

                                    <!-- BODY TEXT -->
                                    <tr>
                                        <td align="center" style="color: #495057; font-size: 16px; line-height: 26px; padding-bottom: 30px;">
                                            <p style="margin: 0;">Your order has been confirmed and the restaurant is preparing your meal. We know you're hungry, so we'll get it to you as soon as possible!</p>
                                        </td>
                                    </tr>
                                    
                                    <!-- ORDER SUMMARY -->
                                    <tr>
                                      <td align="center" style="padding-bottom: 30px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8f9fa; border: 1px solid #dee2e6; border-radius: 8px; padding: 20px;">
                                          <tr>
                                            <td align="left" style="color: #495057; font-size: 14px; line-height: 20px;">
                                              <strong style="color: #212529;">Order ID:</strong> #${orderId}
                                            </td>
                                            <td align="right" style="color: #495057; font-size: 16px; line-height: 20px;">
                                              <strong style="color: #212529;">Total: ${formattedTotal}</strong>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>

                                    <!-- CALL TO ACTION (CTA) BUTTON -->
                                    <tr>
                                        <td align="center" style="padding-bottom: 20px;">
                                            <table border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center" style="border-radius: 8px;" bgcolor="#FF6347">
                                                        <a href="https://food-delivery-frontend-831b.onrender.com/order-status" target="_blank" style="display: inline-block; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px;">Track Your Order</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td align="center" style="padding: 30px 10px 20px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" style="color: #868e96; font-size: 12px; line-height: 18px;">
                                            <p style="margin: 0;">If you have any questions, please contact our support team.</p>
                                            <p style="margin: 10px 0 0 0;"><a href="#" target="_blank" style="color: #868e96; text-decoration: underline;">Unsubscribe</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
  `;
  return htmlTemplate;
};

export const getOrder = async (req, res) => {
  try {
    const cacheKey = `userOrder:${req.userId}`;

    try {
      const userOrders = await redisClient.get(cacheKey);
      if (userOrders) {
        console.log("using cache data");
        return res.status(200).json(JSON.parse(userOrders));
      }
    } catch (error) {
      console.log("Error while fetching order data from cache:", error.message);
    }

    const order = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    if (!order) {
      throw new Error("order not found");
    }

    if (order.length > 0)
      await redisClient.setEx(cacheKey, 600, JSON.stringify(order));

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// export const stripeWebhookHandler = async (req, res) => {
//   let event;
//   try {
//     const sign = req.headers["stripe-signature"];
//     event = STRIPE.webhooks.constructEvent(
//       req.body,
//       sign,
//       STRIPE_ENDPOINT_SECRET
//     );
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json(`webhook error ${error.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const order = await Order.findById(event.data.object.metadata?.orderId);

//     if (!order) {
//       return res.status(404).json({ message: "order not found" });
//     }

//     order.totalAmount = event.data.object.amount_total / 100;
//     order.status = "paid";

//     await order.save();
//   }

//   return res.status(200).send();
// };

export const stripeWebhookHandler = async (req, res) => {
  console.log("🔄 Webhook handler called");

  let event;
  try {
    const sign = req.headers["stripe-signature"];
    console.log("📝 Stripe signature present:", !!sign);

    event = STRIPE.webhooks.constructEvent(
      req.body,
      sign,
      STRIPE_ENDPOINT_SECRET
    );
    console.log("✅ Stripe webhook event received:", event.type);
  } catch (error) {
    console.log("error here");
    console.log("❌ Webhook signature verification failed:", error.message);
    return res.status(400).json(`webhook error ${error.message}`);
  }
  // console.log("going inside");
  // Listen for session completed event
  if (event.type === "checkout.session.completed") {
    console.log("Processing checkout.session.completed", event.data);
    const session = event.data.object;
    const paymentIntent = await STRIPE.paymentIntents.retrieve(
      session.payment_intent
    );
    // const receiptUrl = paymentIntent.charges.data[0].receipt_url;

    console.log("Receipt URL:", paymentIntent);

    try {
      // console.log("📊 Session data:", session);

      const userId = session.metadata.userId;
      const restaurantId = session.metadata.restaurantId;
      const cartItems = JSON.parse(session.metadata.cartItems);
      const deliveryDetails = JSON.parse(session.metadata.deliveryDetails);
      const amountTotal = session.amount_total;

      console.log("🔍 Parsed data:", {
        userId,
        restaurantId,
        cartItemsCount: cartItems.length,
        amountTotal,
      });

      const restaurant = await Restaurant.findById(restaurantId);
      const user = await User.findById(userId);

      console.log("👤 User found:", !!user);
      console.log("🏪 Restaurant found:", !!restaurant);

      if (!restaurant || !user) {
        console.log("❌ Invalid restaurant or user");
        return res.status(400).send("Invalid restaurant or user");
      }

      const newOrder = new Order({
        restaurant: restaurant._id,
        user: user._id,
        cartItems,
        deliveryDetails,
        totalAmount: amountTotal / 100,
        status: "paid",
        createdAt: new Date(),
      });

      console.log("💾 Saving new order...");
      await newOrder.save();
      console.log("Order saved successfully with ID:", newOrder._id);

      // Send confirmation email (comment out if emailQueue is not set up)
      try {
        console.log("📧 Sending confirmation email...");
        await emailQueue.add("send-order-confirmation", {
          to: user.email,
          subject: "Your EasyEats Order Has Been Placed!",
          html: getOrderConfirmationHtml(
            user.name,
            newOrder._id,
            amountTotal / 100
          ),
        });
        console.log("✅ Email queued successfully");
      } catch (emailError) {
        console.log("⚠️ Email sending failed:", emailError.message);
        // Don't fail the entire process if email fails
      }

      // Clear cache
      try {
        await redisClient.del(`orders:${restaurant._id}`);
        await redisClient.del(`userOrder:${user._id}`);
        console.log("🗑️ Cache cleared successfully");
      } catch (cacheError) {
        console.log("⚠️ Cache clearing failed:", cacheError.message);
      }
    } catch (err) {
      console.log(
        "❌ Error inside checkout.session.completed handler:",
        err.message
      );
      console.log("📚 Full error stack:", err.stack);
      return res.status(500).json({ message: err.message });
    }
  } else {
    console.log("ℹIgnoring event type:", event.type);
  }

  console.log("✅ Webhook processed successfully");
  return res.status(200).send();
};

// export const createCheckoutSession = async (req, res) => {
//   try {
//     // console.log(req.body);

//     const checkoutSessionReq = req.body;

//     const restaurant = await Restaurant.findById(
//       checkoutSessionReq.restaurantId
//     );

//     if (!restaurant) {
//       throw new Error("restaurant not found");
//     }

//     // console.log(checkoutSessionReq.deliverDetails);
//     // console.log(checkoutSessionReq.cartItems);

//     const newOrder = new Order({
//       restaurant: restaurant,
//       user: req.userId,
//       status: "placed",
//       deliveryDetails: checkoutSessionReq.deliveryDetails,
//       cartItems: checkoutSessionReq.cartItems,
//       createdAt: new Date(),
//     });

//     const lineItems = creasteLineItems(
//       checkoutSessionReq,
//       restaurant.menuItems
//     );

//     // console.log("lines item ", lineItems);

//     const session = await createSession(
//       lineItems,
//       newOrder._id.toString(),
//       restaurant.deliveryPrice,
//       restaurant._id.toString()
//     );

//     if (!session.url) {
//       return res.status(500).json({ message: "error creating stripe session" });
//     }

//     // console.log(session.url);

//     await newOrder.save();

//     // let cacheKey = `orders:${String(restaurant._id)}`;
//     // try {
//     //   await redisClient.del(cacheKey);
//     //   console.log("deleted previous orders cache");
//     // } catch (error) {
//     //   console.log("error while deleting orders cache");
//     //   // throw new Error(error);
//     // }

//     res.status(200).json({ url: session.url });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(500)
//       .json({ message: error.raw?.message || error.message });
//   }
// };

export const createCheckoutSession = async (req, res) => {
  try {
    const checkoutSessionReq = req.body;
    // console.log(checkoutSessionReq);

    const restaurant = await Restaurant.findById(
      checkoutSessionReq.restaurantId
    );
    if (!restaurant) {
      throw new Error("restaurant not found");
    }

    const lineItems = creasteLineItems(
      checkoutSessionReq,
      restaurant.menuItems
    );

    const session = await createSession(
      lineItems,
      restaurant.deliveryPrice,
      restaurant._id.toString(),
      {
        userId: req.userId,
        restaurantId: restaurant._id.toString(),
        cartItems: JSON.stringify(checkoutSessionReq.cartItems),
        deliveryDetails: JSON.stringify(checkoutSessionReq.deliveryDetails),
      }
    );

    if (!session.url) {
      return res.status(500).json({ message: "error creating stripe session" });
    }

    return res.status(200).json({ url: session.url });
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
  deliveryPrice,
  restaurantId,
  metadata
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
    metadata: metadata,
    // metadata: {
    //   orderId,
    //   restaurantId,
    // },
    // success_url: `${FRONTEND_URL}/order-status?success=true`,
    // cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    success_url: `${FRONTEND_URL}/order-status`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}`,
  });

  return sessionData;
};
