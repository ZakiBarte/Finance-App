import jwt from "jsonwebtoken";
import env from "../lib/env.js"

export const generateToken = (id) => {
  return jwt.sign({ id }, env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
