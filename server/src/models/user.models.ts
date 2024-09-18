import mongoose, { Schema, Document, Model } from "mongoose";
import { hashPassword, comparePassword } from "../utils/BCrypt";
import { IUser } from "../@types/user.types";

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true },
    task: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

// Hash the password before saving the user
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

// Add the comparePassword method to the schema
UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return comparePassword(enteredPassword, this.password);
};

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
