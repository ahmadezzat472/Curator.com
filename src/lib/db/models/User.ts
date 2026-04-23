import { Schema, model, models, Model, Document } from "mongoose";
import { hash, verify } from "argon2";

export type Role = "customer" | "vendor" | "admin";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  hashedRefreshToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
  verifyPassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["customer", "vendor", "admin"],
      default: "customer",
    },
    hashedRefreshToken: { type: String, default: null, select: false },
    resetPasswordToken: { type: String, default: null, select: false },
    resetPasswordExpires: { type: Date, default: null, select: false },
  },
  { timestamps: true },
);

userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await hash(this.password);
});

userSchema.methods.verifyPassword = function (
  password: string,
): Promise<boolean> {
  return verify(this.password, password);
};

export const User: Model<IUser> =
  models.User || model<IUser>("User", userSchema);
