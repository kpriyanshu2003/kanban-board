import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface ErrorData {
  [key: string]: any;
}

export type RequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) =>
  | Promise<Response<any, Record<string, any>> | undefined>
  | Promise<void>
  | void;

export interface UserJwtPayload extends JwtPayload {
  id: mongoose.Types.ObjectId;
  email: string;
}

export interface CustomRequest extends Request {
  user?: UserJwtPayload;
}
