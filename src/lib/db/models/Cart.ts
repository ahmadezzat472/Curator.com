import { Schema, model, models, Model, Document, Types } from "mongoose";

export interface ICartItem {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: Types.DocumentArray<ICartItem>;
  createdAt: Date;
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: { type: Number, required: true, min: 1 },
});

const cartSchema = new Schema<ICart>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
);

export const Cart: Model<ICart> =
  models.Cart || model<ICart>("Cart", cartSchema);
