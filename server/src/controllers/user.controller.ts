import { Request, Response } from "express";
import User from "../models/user.models";
import { asyncHandler } from "../utils/AsyncHandler";
import { generateToken } from "../utils/JWT";
import { ApiResponse } from "../utils/ApiResponse";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) return res.send(new ApiResponse(400, "User already exists"));
  user = new User({ email, password });
  await user.save();

  const token = generateToken({ id: user.id, email: user.email });

  return res.send(
    new ApiResponse(200, "User registered successfully", { token })
  );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send(new ApiResponse(400, "Invalid credentials"));

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.send(new ApiResponse(400, "Invalid credentials"));

  const token = generateToken({ id: user.id, email: user.email });

  return res.send(
    new ApiResponse(200, "User logged in successfully", { token })
  );
});

export { registerUser, loginUser };
