import { Router } from 'express';
import validate from '../../core/middleware/validate';
import AuthController from './auth.controller';
import { isAuthenticated } from './lib/auth.middleware';
import AuthVal from './lib/auth.val';

const authRouter = Router();

authRouter.post(
  '/user/sign-up',
  validate(AuthVal.signUpUserRules),
  AuthController.signUpUser,
);

authRouter.post(
  '/user/login',
  validate(AuthVal.loginRules),
  AuthController.loginUser,
);

authRouter.post('/user/refresh/:refreshToken', AuthController.refresh('user'));

authRouter.post(
  '/manager/sign-up',
  validate(AuthVal.signUpManagerRules),
  AuthController.signUpManager,
);

authRouter.post(
  '/manager/login',
  validate(AuthVal.loginRules),
  AuthController.loginManager,
);

authRouter.post(
  '/manager/refresh/:refreshToken',
  AuthController.refresh('manager'),
);

authRouter.get('/test', isAuthenticated, AuthController.test);

export default authRouter;
