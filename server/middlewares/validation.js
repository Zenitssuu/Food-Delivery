import { body, validationResult } from "express-validator";

const handleValidationReqError = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateUserReq = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),

  body("address").isString().notEmpty().withMessage("Address must be a string"),

  body("city").isString().notEmpty().withMessage("City must be a string"),

  body("country").isString().notEmpty().withMessage("City must be a string"),

  handleValidationReqError,
];

export const validateResturantReq = [
  body("restaurantName")
  .notEmpty()
  .withMessage("Restaurant name is required"),

  body("city")
  .notEmpty()
  .withMessage("City is required"),

  body("country")
  .notEmpty()
  .withMessage("Country is required"),

  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),

  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a postivie integar"),

  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),

  body("menuItems")
  .isArray()
  .withMessage("Menu items must be an array"),

  body("menuItems.*.name")
  .notEmpty()
  .withMessage("Menu item name is required"),

  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a postive number"),

    handleValidationReqError
];
