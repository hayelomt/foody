import { check, ValidationChain } from 'express-validator';
import { Gender } from '../../../core/utils/types';
import validationBuilder from '../../../core/utils/validation-builder';
import UserService from '../../user/lib/user.service';

type AuthValKeys = 'signUpRules' | 'loginRules';

const AuthVal: Record<AuthValKeys, ValidationChain[]> = {
  signUpRules: [
    validationBuilder(check('name'), 'Name')
      .required()
      .string()
      .minString(2)
      .maxString(50)
      .build(),
    validationBuilder(check('email'), 'Email')
      .required()
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
  loginRules: [],
};

export default AuthVal;
