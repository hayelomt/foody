import { Document, Schema } from 'mongoose';
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
});

const Restaurant = db.model<IRestaurant>('Restaurant', RestaurantSchema);

export default Restaurant;
