import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "../@types/index.types";
import { ApiResponse } from "./ApiResponse";

/**
 * Wraps an Express request handler with error handling.
 *
 * @param requestHandler - The request handler function to be wrapped.
 * @returns A new request handler function with error handling.
 */
export const asyncHandler =
  (requestHandler: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await requestHandler(req, res, next);
    } catch (err: any) {
      res.send(new ApiResponse(err.code || 500, err.message));
      console.warn(err.message);
    }
  };
