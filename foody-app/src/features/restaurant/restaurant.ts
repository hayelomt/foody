import { Image, Location, Model } from '../../core/utils/types';

export type Restaurant = {
  location: Location;
  image: Image;
  name: string;
  manager: string;
  deliveryRate: number;
} & Model;

export type Ingredient = {
  image: string;
  name: string;
  _id: string;
};

export type MenuItem = {
  image: Image;
  name: string;
  price: number;
  ingredients: Ingredient[];
  type: string;
  category: string;
  tags: string[];
  cookTime: number;
  available: boolean;
} & Model;
