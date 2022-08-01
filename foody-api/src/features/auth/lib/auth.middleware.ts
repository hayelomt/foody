import * as jwt from 'jsonwebtoken';
import * as http from 'http';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../user/user';
import authConfig from './auth-config';
import HttpError from '../../../core/error';
import { UserTypes } from './auth-type';
import { IManager } from '../../manager/manager';
import AuthProvider from './auth-provider';

const { TokenExpiredError } = jwt;

export interface RequestWithUser extends Request {
  user: IUser | IManager;
}

export const isAuthenticated =
  (userType: UserTypes) =>
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const token: string | string[] = req.headers['x-access-token'];

    if (!token) {
      return res.status(401).json({ msg: 'No token provided' });
    }

    try {
      const payload = jwt.verify(token.toString(), authConfig.jwtSecret) as {
        _id: string;
      };
      const user = await AuthProvider.authService[userType].findOne(
        payload._id,
      );

      if (!user) {
        return res.status(401).json({ msg: 'Account not found' });
      }

      req.user = user;

      return next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).json({ msg: 'Token expired, login again ' });
      }

      return next(new HttpError(401, http.STATUS_CODES[401]));
    }
  };
