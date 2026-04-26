import { Schema, model, models, Model, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    image: { type: String, default: null },
  },
  { timestamps: true },
);

export const Category: Model<ICategory> =
  models.Category || model<ICategory>("Category", categorySchema);
