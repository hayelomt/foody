import { check, ValidationChain } from 'express-validator';
import validationBuilder from '../../../core/utils/validation-builder';
import { RequestWithUser } from '../../auth/lib/auth.middleware';
import RestaurantService from '../../restaurant/lib/restaurant.service';
import { MenuItemType } from '../menuitem';

type MenuItemKeys = 'createRules';

const MenuItemVal: Record<MenuItemKeys, ValidationChain[]> = {
  createRules: [
    validationBuilder(check('name'), 'Name')
      .required()
      .string()
      .minString(1)
      .maxString(50)
      .build(),
    validationBuilder(check('price'), 'Price')
      .required()
      .number()
      .numberGt(0)
      .build(),
    validationBuilder(check('ingredients'), 'Ingredients')
      .optional()
      .array()
      .build(),
    validationBuilder(check('ingredients.*.name'), 'Ingredient')
      .optional()
      .string()
      .minString(1)
      .maxString(15)
      .build(),
    validationBuilder(check('type'), 'Type')
      .required()
      .enum(Object.values(MenuItemType))
      .build(),
    validationBuilder(check('category'), 'Category')
      .optional()
      .string()
      .minString(1)
      .maxString(15)
      .build(),
    validationBuilder(check('tags'), 'Tags').optional().array().build(),
    validationBuilder(check('tags.*'), 'Tag')
      .optional()
      .string()
      .minString(1)
      .maxString(15)
      .build(),
    validationBuilder(check('prepTime'), 'Prep time')
      .optional()
      .number()
      .build(),
    validationBuilder(check('available'), 'Available')
      .required()
      .bool()
      .build(),
    validationBuilder(check('restaurantId'), 'Restaurant')
      .required()
      .string()
      .validMongooseId()
      .exists(RestaurantService)
      .custom(
        async (id: string, req: RequestWithUser) =>
          await RestaurantService.isManager(id, req.user._id!),
        (_: string) => 'Not a manager of selected restaurant',
      )
      .build(),
  ],
};

export default MenuItemVal;
