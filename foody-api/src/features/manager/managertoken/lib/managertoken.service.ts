import * as jwt from 'jsonwebtoken';
import HttpError from '../../../../core/error';
import authConfig from '../../../auth/lib/auth-config';
import ManagerToken from '../managertoken';

const ManagerTokenService = {
  generateAuthTokens: async (managerId: string) => {
    const payload = { _id: managerId };
    const accessToken = jwt.sign(payload, authConfig.jwtSecret, {
      expiresIn: authConfig.jwtExpiresIn,
    });
    const refreshToken = jwt.sign(payload, authConfig.refreshSecret, {
      expiresIn: authConfig.refreshExpiresIn,
    });

    const managerToken = await ManagerToken.findOne({ managerId: payload._id });

    // TODO: 1. Refactor for multi token support
    if (managerToken) {
      await managerToken.remove();
    }

    await ManagerToken.create({ managerId: payload._id, token: refreshToken });

    return { accessToken, refreshToken };
  },

  verifyRefreshToken: async (refreshToken: string) => {
    const managerToken = await ManagerToken.findOne({ token: refreshToken });
    if (!managerToken) {
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

export default ManagerTokenService;
