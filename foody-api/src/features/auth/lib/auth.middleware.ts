import * as jwt from 'jsonwebtoken';
import * as http from 'http';
import { NextFunction, Request, Response } from 'express';
import { IUser } from '../../user/user';
import authConfig from './auth-config';
import HttpError from '../../../core/error';

const { TokenExpiredError } = jwt;

export interface RequestWithUser extends Request {
  user: IUser;
}

export function isAuthenticated(
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) {
  const token: string | string[] = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const user = jwt.verify(token.toString(), authConfig.jwtSecret);
    console.log(user);

    return next();
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).json({ msg: 'Token expired, login again ' });
    }

    return next(new HttpError(401, http.STATUS_CODES[401]));
  }
}
