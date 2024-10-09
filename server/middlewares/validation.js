import { body, validationResult } from "express-validator";

const handleValidationReqError = async (req,res,next)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next();
}

export const validateUserReq = [
  body("name")
  .isString()
  .notEmpty()
  .withMessage("Name must be a string"),

  body("address")
  .isString()
  .notEmpty()
  .withMessage("Address must be a string"),

  body("city")
  .isString()
  .notEmpty()
  .withMessage("City must be a string"),

  body("country")
  .isString()
  .notEmpty()
  .withMessage("City must be a string"),

  handleValidationReqError,
];
