import { Router } from 'express';
import validate from '../../core/middleware/validate';
import AuthController from './auth.controller';
import { isAuthenticated } from './lib/auth.middleware';
import AuthVal from './lib/auth.val';

const authRouter = Router();

authRouter.post(
  '/sign-up',
  validate(AuthVal.signUpRules),
  AuthController.signUp,
);

authRouter.post('/login', validate(AuthVal.loginRules), AuthController.login);

authRouter.post('/refresh/:refreshToken', AuthController.refresh);

authRouter.get('/test', isAuthenticated, AuthController.test);

export default authRouter;
