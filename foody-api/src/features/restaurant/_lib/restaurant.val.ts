import { check, ValidationChain } from 'express-validator';
import validationBuilder from '../../../core/utils/validation-builder';
import RestaurantService from './restaurant.service';

type RestaurantValKeys = 'createRules';

const RestaurantVal: Record<RestaurantValKeys, ValidationChain[]> = {
  createRules: [
    validationBuilder(check('name'), 'Name')
      .required()
      .string()
      .minString(1)
      .maxString(50)
      .custom(
        async (name: string) => !(await RestaurantService.nameExists(name)),
        (field: string) => `Restaurant ${field} already in use`,
      )
      .build(),
    validationBuilder(check('latitude'), 'Latitude')
      .required()
      .number()
      .build(),
    validationBuilder(check('longitude'), 'Longitude')
      .required()
      .number()
      .build(),
    validationBuilder(check('deliveryRate'), 'Deliver Rate')
      .required()
      .number()
      .numberGte(0)
      .build(),
    validationBuilder(check('image'), 'Image')
      .custom(
        (_: any, req) => !!req.file,
        (field: string) => `${field} is required`,
      )
      .build(),
  ],
};

export default RestaurantVal;
