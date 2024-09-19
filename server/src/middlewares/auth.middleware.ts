import { verifyToken } from "../utils/JWT";
import { NextFunction, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { CustomRequest } from "../@types/index.types";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token)
    return res.send(new ApiResponse(401, "No token, authorization denied"));

  try {
    const decoded = verifyToken(token);
    if (typeof decoded === "string")
      return res.send(new ApiResponse(401, decoded));
    else req.user = decoded;
    next();
  } catch (err) {
    res.send(new ApiResponse(401, "Invalid token"));
  }
};

export default auth;
