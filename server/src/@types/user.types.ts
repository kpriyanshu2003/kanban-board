import { Types, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  task?: Types.ObjectId[];
  comparePassword(enteredPassword: string): Promise<boolean>;
}
