import { check, ValidationChain } from 'express-validator';
import { Gender } from '../../../core/utils/types';
import validationBuilder from '../../../core/utils/validation-builder';
import ManagerService from '../../manager/lib/manager.service';
import UserService from '../../user/lib/user.service';

type AuthValKeys = 'signUpUserRules' | 'signUpManagerRules' | 'loginRules';

const AuthVal: Record<AuthValKeys, ValidationChain[]> = {
  signUpUserRules: [
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
        async (email: string) => !(await UserService.emailExists(email)),
        (field) => `${field} already in use`,
      )
      .build(),
    validationBuilder(check('password'), 'Password')
      .required()
      .minString(6)
      .maxString(30)
      .build(),
    validationBuilder(check('location'), 'Location')
      .optional()
      .minString(2)
      .maxString(50)
      .build(),
    validationBuilder(check('gender'), 'Gender')
      .optional()
      .enum(Object.values(Gender))
      .build(),
  ],

  signUpManagerRules: [
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
        async (email: string) => !(await ManagerService.emailExists(email)),
        (field) => `${field} already in use`,
      )
      .build(),
    validationBuilder(check('password'), 'Password')
      .required()
      .minString(6)
      .maxString(30)
      .build(),
  ],

  loginRules: [
    validationBuilder(check('email'), 'Email').required().build(),
    validationBuilder(check('password'), 'Password').required().build(),
  ],
};

export default AuthVal;
