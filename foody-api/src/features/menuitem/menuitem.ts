import { Document, Schema, Types } from 'mongoose';
import { db } from '../../core/db/connection';
import appConstants from '../../core/utils/appconstants';

export enum MenuItemType {
  Drink = 'drink',
  Food = 'food',
}

export interface IMenuItem extends Document {
  name: string;
  price: number;
  image: {
    size: number;
    path: string;
  };
  ingredients: { image: string; name: string }[];
  type: MenuItemType;
  category: string;
  tags: string[];
  cookTime: number;
  available: boolean;
  restaurantId: string;
}

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      size: Number,
      path: String,
    },
    ingredients: [{ image: String, name: String }],
    type: { type: String, required: true },
    category: { type: String },
    tags: [String],
    cookTime: Number,
    available: { type: Boolean, required: true },
    restaurantId: { type: Types.ObjectId, ref: appConstants.models.restaurant },
  },
  {
    timestamps: true,
  },
);

const MenuItem = db.model<IMenuItem>(
  appConstants.models.menuItem,
  MenuItemSchema,
);

export default MenuItem;
