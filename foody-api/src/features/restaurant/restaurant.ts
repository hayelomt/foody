import { Document, Schema, Types } from 'mongoose';
import { db } from '../../core/db/connection';

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
  managerId: string;
  deliveryRate: number;
}

const RestaurantSchema = new Schema({
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
  managerId: { type: Types.ObjectId, ref: 'manager' },
  deliveryRate: { type: Number, required: true },
});

const Restaurant = db.model<IRestaurant>('restaurant', RestaurantSchema);

export default Restaurant;
