import { Router } from 'express';
import validate from '../../core/middleware/validate';
import AuthController from './auth.controller';
import { isAuthenticated } from './lib/auth.middleware';
import AuthVal from './lib/auth.val';

const authRouter = Router();

authRouter.post(
  '/user/sign-up',
  validate(AuthVal.signUpRules),
  AuthController.signUpUser,
);

authRouter.post(
  '/user/login',
  validate(AuthVal.loginRules),
  AuthController.loginUser,
);

authRouter.post('/user/refresh/:refreshToken', AuthController.refresh('user'));

authRouter.get('/test', isAuthenticated, AuthController.test);

export default authRouter;
