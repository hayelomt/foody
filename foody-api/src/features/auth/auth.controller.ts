import { Request, Response } from 'express';
import catchAsync from '../../core/utils/catch-async';
import User from '../user/user';
import UserTokenService from '../user/usertoken/lib/usertoken.service';
import AuthService from './lib/auth.service';

const AuthController = {
  signUp: catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.signUpUser(req.body);

    res.json({ data: result });
  }),

  login: catchAsync(async (req: Request, res: Response) => {
    const user = await AuthService.login(req.body);

    const { accessToken, refreshToken } =
      await UserTokenService.generateAuthTokens(user._id);

    res.json({
      data: {
        email: user.email,
        name: user.profile.name,
        accessToken,
        refreshToken,
      },
    });
  }),

  refresh: async (req: Request, res: Response) => {
    const { refreshToken: requestRefreshToken } = req.params;
    const userId = await UserTokenService.verifyRefreshToken(
      requestRefreshToken,
    );

    const { accessToken, refreshToken } =
      await UserTokenService.generateAuthTokens(userId);

    res.json({
      accessToken,
      refreshToken,
    });
  },
  test: async (req: Request, res: Response) => {
    res.json({ data: (req as any).user });
  },
};

export default AuthController;
