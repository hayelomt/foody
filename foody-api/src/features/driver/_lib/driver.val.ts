import { check, ValidationChain } from 'express-validator';
import validationBuilder from '../../../core/utils/validation-builder';
import { RequestWithUser } from '../../auth/_lib/auth.middleware';
import RestaurantService from '../../restaurant/_lib/restaurant.service';
import DriverService from './driver.service';

type ManagerKeys = 'createDriverRules';

const DriverVal: Record<ManagerKeys, ValidationChain[]> = {
  createDriverRules: [
    validationBuilder(check('name'), 'Name')
      .required()
      .string()
      .minString(2)
      .maxString(50)
      .build(),
    validationBuilder(check('email'), 'Email')
      .required()
      .email()
      .maxString(255)
      .custom(
        async (email: string) => !(await DriverService.emailExists(email)),
        (field) => `${field} already in use`,
      )
      .build(),
    validationBuilder(check('password'), 'Password')
      .required()
      .minString(6)
      .maxString(30)
      .build(),
    validationBuilder(check('restaurantId'), 'Restaurant')
      .required()
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

export default DriverVal;
