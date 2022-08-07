import { Request, Response } from 'express';
import catchAsync from '../../core/utils/catchasync';
import ManagerService from '../manager/_lib/manager.service';
import UserService from '../user/_lib/user.service';
import AuthProvider from './_lib/auth-provider';
import { UserTypes } from './_lib/auth-type';
import { RequestWithUser } from './_lib/auth.middleware';
import AuthService from './_lib/auth.service';

const AuthController = {
  signUpUser: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.signUpUser(req.body);

    res.json({ data: result });
  }),

  loginUser: catchAsync(async (req: Request, res: Response) => {
    const user = await AuthService.login(UserService, req.body);

    const { accessToken, refreshToken } =
      await AuthProvider.tokenable.user.generateAuthTokens(user._id);

    res.json({
      data: {
        email: user.email,
        name: user.profile.name,
        accessToken,
        refreshToken,
      },
    });
  }),

  signUpManager: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.signUpManager(req.body);

    res.json({ data: result });
  }),

  loginManager: catchAsync(async (req: Request, res: Response) => {
    const manager = await AuthService.login(ManagerService, req.body);

    const { accessToken, refreshToken } =
      await AuthProvider.tokenable.manager.generateAuthTokens(manager._id);

    res.json({
      data: {
        email: manager.email,
        name: manager.profile.name,
        accessToken,
        refreshToken,
      },
    });
  }),

  refresh: (userType: UserTypes) =>
    catchAsync(async (req: Request, res: Response) => {
      const { refreshToken: requestRefreshToken } = req.params;
      const tokenableService = AuthProvider.tokenable[userType];

      const userId = await tokenableService.verifyRefreshToken(
        requestRefreshToken,
      );

      const { accessToken, refreshToken } =
        await tokenableService.generateAuthTokens(userId);

      res.json({
        accessToken,
        refreshToken,
      });
    }),

  test: async (req: RequestWithUser, res: Response) => {
    res.json({ data: req.user });
  },
};

export default AuthController;
