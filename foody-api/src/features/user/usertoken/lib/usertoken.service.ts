import * as jwt from 'jsonwebtoken';
import HttpError from '../../../../core/error';
import authConfig from '../../../auth/lib/auth-config';
import UserToken from '../usertoken';

const UserTokenService = {
  generateAuthTokens: async (userId: string) => {
    const payload = { _id: userId };
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });
    const refreshToken = jwt.sign(payload, authConfig.refreshSecret, {
      expiresIn: authConfig.refreshExpiresIn,
    });

    const userToken = await UserToken.findOne({ userId: payload._id });

    // TODO: 1. Refactor for multi token support
    if (userToken) {
      await userToken.remove();
    }

    await UserToken.create({ userId: payload._id, token: refreshToken });

    return { accessToken, refreshToken };
  },

  verifyRefreshToken: async (refreshToken: string) => {
    const userToken = await UserToken.findOne({ token: refreshToken });
    if (!userToken) {
      throw new HttpError(401, 'Invalid refresh token');
    }

    try {
      const valid = (await jwt.verify(
        refreshToken,
        authConfig.refreshSecret,
      )) as { _id: string };

      return valid._id;
    } catch (err) {
      throw new HttpError(401, 'Invalid refresh token');
    }
  },
};

export default UserTokenService;
