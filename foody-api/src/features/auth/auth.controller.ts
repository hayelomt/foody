import { Request, Response } from 'express';
import User from '../user/user';
import UserTokenService from '../user/usertoken/lib/usertoken.service';
import AuthService from './lib/auth.service';

const AuthController = {
  signUp: async (req: Request, res: Response) => {
    const result = await AuthService.signUpUser(req.body);

    res.json({ data: result });
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'invalid user' });
    }

    const valid = await user.comparePassword(password);
    if (!valid) {
      return res.status(401).json({ msg: 'invalid pass' });
    }

    const { accessToken, refreshToken } =
      await UserTokenService.generateAuthTokens(user._id);

    res.json({
      data: {
        email: user.email,
        name: user.email,
        accessToken,
        refreshToken,
      },
    });
  },

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
