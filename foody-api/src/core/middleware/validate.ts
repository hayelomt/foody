import { Request, Response, NextFunction } from 'express';
import {
  validationResult,
  ValidationChain,
  ErrorFormatter,
} from 'express-validator';
import HttpError from '../error';

const errorCb = (req: Request, _res: Response, next: NextFunction) => {
  const format: ErrorFormatter<string> = ({ msg }) => {
    return `${msg}`;
  };
  const result = validationResult(req).formatWith(format);

  if (!result.isEmpty()) {
    return next(new HttpError(400, 'Bad Request', result.mapped()));
  }
  next();
};

export default (validationRules: ValidationChain[]) => [
  ...validationRules,
  errorCb,
];
