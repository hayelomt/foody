import { Request, Response } from 'express';
import catchAsync from '../../core/utils/catch-async';
import ManagerService from '../manager/lib/manager.service';
import ManagerTokenService from '../manager/managertoken/lib/managertoken.service';
import UserService from '../user/lib/user.service';
import UserTokenService from '../user/usertoken/lib/usertoken.service';
import Tokenable from './contracts/tokenable';
import { UserTypes } from './lib/auth-type';
import AuthService from './lib/auth.service';

const tokenableMap: Record<UserTypes, Tokenable> = {
  user: UserTokenService,
  manager: ManagerTokenService,
};

const AuthController = {
  signUpUser: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.signUpUser(req.body);

    res.json({ data: result });
  }),

  loginUser: catchAsync(async (req: Request, res: Response) => {
    const user = await AuthService.login(UserService, req.body);

    const { accessToken, refreshToken } =
      await tokenableMap.user.generateAuthTokens(user._id);

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
      await tokenableMap.manager.generateAuthTokens(manager._id);

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
      const tokenableService = tokenableMap[userType];

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

  test: async (req: Request, res: Response) => {
    res.json({ data: (req as any).user });
  },
};

export default AuthController;
