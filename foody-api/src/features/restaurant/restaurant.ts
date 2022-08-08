import { Document, Schema, Types } from 'mongoose';
import { db } from '../../core/db/connection';
import appConstants from '../../core/utils/appconstants';

export interface IRestaurant extends Document {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  image: {
    size: number;
    path: string;
  };
  manager: string;
  deliveryRate: number;
}

const RestaurantSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    image: {
      size: Number,
      path: String,
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: appConstants.models.manager,
    },
    deliveryRate: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

const Restaurant = db.model<IRestaurant>(
  appConstants.models.restaurant,
  RestaurantSchema,
);

export default Restaurant;
