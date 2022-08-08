import env from '../../../core/env';

const authConfig = {
  saltRounds: 12,
  jwtSecret: env.auth.JWT_SECRET,
  jwtExpiresIn: env.auth.JWT_EXPIRE_MINUTES * 60, // seconds
  refreshSecret: env.auth.REFRESH_SECRET,
  refreshExpiresIn: env.auth.REFRESH_EXPIRE_DAYS * 24 * 3600,
  issuer: 'foody.com',
  audience: 'foody.com',
};

export default authConfig;
