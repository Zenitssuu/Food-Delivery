import { auth } from "express-oauth2-jwt-bearer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
dotenv.config();

export const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

export const jwtParse = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.split(" ")[1];

  try {
    const decode = jwt.decode(token);
    const auth0Id = decode.sub;

    const user = await User.findOne({ auth0Id });

    if (!user) {
      res.sendStatus(401);
    }

    req.auth0Id = auth0Id;
    req.userId = user._id.toString();
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(401);
  }
};
