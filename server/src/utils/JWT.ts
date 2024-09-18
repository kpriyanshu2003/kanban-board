import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { UserJwtPayload } from "../@types/index.types";

config();
const jwt_secret = process.env.JWT_SECRET || "jwt_secret";

// TODO : JsDoc

/**
 * Generate JWT token.
 * @param {UserJwtPayload} payload - The data to encode in the JWT token.
 * @param {string} expiresIn - Expiration time (default is '1h').
 * @returns {string} The generated JWT token.
 */
const generateToken = (
  payload: UserJwtPayload,
  expiresIn: string = "1h"
): string => {
  return jwt.sign(payload, jwt_secret, { expiresIn });
};

/**
 * Verify JWT token.
 * @param {string} token - The token to verify.
 * @returns {UserJwtPayload} Decoded payload or throws an error if invalid.
 */
const verifyToken = (token: string): string | UserJwtPayload => {
  try {
    return jwt.verify(token, jwt_secret) as UserJwtPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { generateToken, verifyToken };
