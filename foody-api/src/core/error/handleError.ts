import * as express from 'express';
import { HttpError } from './index';
import logger from '../utils/logger';

/**
 * @exports
 * @param {Request} req
 * @param {*} res
 * @param {NextFunction} next
 *
 * @swagger
 * components:
 *  schemas:
 *    Error:
 *      type: object
 *      required:
 *        - status
 *        - message
 *      properties:
 *        status:
 *          type: integer
 *          description: HTTP status code
 *          example: 200
 *        message:
 *          type: string
 *          description: Error description
 *          example: User created
 */
export default (
  error: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) => {
  if (error instanceof HttpError) {
    return res
      .status(error.status)
      .json({ msg: error.message, error: error.error });
  }

  logger.log({
    message: 'Unknown error occurred',
    level: 'error',
    error: error,
  });

  res.status(500).json({ msg: 'Unknown error occurred', error: {} });
};
