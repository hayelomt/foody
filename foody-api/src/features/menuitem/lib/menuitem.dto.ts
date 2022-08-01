import Money from '../../../core/models/money';

type CreateMenuItemDto = {
  name: string;
  price: number;
  image: {
    size: number;
    path: string;
  };
  ingredients: { image: string; name: string }[];
  type: string;
  category: string;
  tags: string[];
  cookTime: number;
  available: boolean;
  restaurantId: string;
};

const MenuItemDto = {
  createMenuItem: (data: any): CreateMenuItemDto => ({
    name: data.name,
    price: Money.fromBill(data.price).amount,
    image: data.image,
    ingredients: data.ingredients.map((i: string) => JSON.parse(i)),
    type: data.type,
    category: data.category,
    tags: data.tags || [],
    cookTime: data.cookTime,
    available: data.available === 'true' ? true : false,
    restaurantId: data.restaurantId,
  }),
};

export default MenuItemDto;
