import { NextFunction, Request } from 'express';
import * as express from 'express';
import { HttpError } from './index';

interface CustomResponse extends express.Response {
  sendHttpError: (error: HttpError | Error, message?: string) => void;
}

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
export function sendHttpErrorModule(
  _req: Request,
  res: CustomResponse,
  next: NextFunction,
): void {
  res.sendHttpError = (error: HttpError): void => {
    res.status(error.status);

    res.json({
      status: error.status,
      name: error.name,
      message: error.message,
    });
  };

  next();
}
