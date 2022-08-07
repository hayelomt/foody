import { expect } from 'chai';
import * as jwt from 'jsonwebtoken';
import * as sinon from 'sinon';
import { userFactory } from '../../../../../src/core/db/factory/user.factory';
import HttpError from '../../../../../src/core/error';
import authConfig from '../../../../../src/features/auth/_lib/auth-config';
import User from '../../../../../src/features/user/user';
import UserTokenService from '../../../../../src/features/user/usertoken/_lib/usertoken.service';
import UserToken from '../../../../../src/features/user/usertoken/usertoken';
import { assertError } from '../../../../testUtils';

const sandbox = sinon.createSandbox();

afterEach(() => {
  sandbox.restore();
});

describe('UserTokenService', () => {
  describe('verifyRefreshToken', () => {
    it('returns user id on valid verification', async () => {
      const user = await User.create(userFactory());
      const refreshToken = jwt.sign(
        { _id: user._id },
        authConfig.refreshSecret,
        {
          expiresIn: authConfig.refreshExpiresIn,
        },
      );
      await UserToken.create({ token: refreshToken, userId: user.id });

      const userId = await UserTokenService.verifyRefreshToken(refreshToken);

      expect(userId).to.equal(user._id.toString());
    });

    it('throws 401 http error on invalid signature', async () => {
      const user = await User.create(userFactory());
      const refreshToken = jwt.sign({ _id: '1' }, authConfig.refreshSecret, {
        expiresIn: authConfig.refreshExpiresIn,
      });
      await UserToken.create({ token: refreshToken, userId: user.id });

      sandbox.stub(jwt, 'verify').throws(new Error('invalid'));

      await assertError(
        () => UserTokenService.verifyRefreshToken(refreshToken),
        (err) => {
          expect(err instanceof HttpError).to.be.true;
          expect((err as HttpError).message).to.equal('Invalid refresh token');
          expect((err as HttpError).status).to.equal(401);
        },
      );
    });

    it('throws 401 http error for non existent token', async () => {
      await assertError(
        () => UserTokenService.verifyRefreshToken('token'),
        (err) => {
          expect(err instanceof HttpError).to.be.true;
          expect((err as HttpError).message).to.equal('Invalid refresh token');
          expect((err as HttpError).status).to.equal(401);
        },
      );
    });
  });

  describe('generateAuthToken', () => {
    it('generates token successfully', async () => {
      const user = await User.create(userFactory());
      const payload = { _id: user._id };
      const signSpy = sandbox.spy(jwt, 'sign');

      const { accessToken, refreshToken } =
        await UserTokenService.generateAuthTokens(user._id);

      // Assert sign call
      expect(signSpy.calledTwice).to.be.true;
      expect(
        signSpy.getCall(0).calledWith(payload, authConfig.jwtSecret, {
          expiresIn: authConfig.jwtExpiresIn,
        }),
      ).to.be.true;
      expect(
        signSpy.getCall(1).calledWith(payload, authConfig.refreshSecret, {
          expiresIn: authConfig.refreshExpiresIn,
        }),
      ).to.be.true;

      // Assert token return
      expect(accessToken).to.exist;
      expect(typeof accessToken).to.equal('string');
      expect(refreshToken).to.exist;
      expect(typeof refreshToken).to.equal('string');

      // Assert UserToken instance created
      const userToken = await UserToken.findOne({ userId: user._id });
      expect(userToken).to.exist;
      expect(userToken.token).to.equal(refreshToken);
    });
  });
});
