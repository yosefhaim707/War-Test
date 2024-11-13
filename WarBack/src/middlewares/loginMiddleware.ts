import e, { NextFunction, Request, Response } from 'express';
import loginVerify from '../utils/loginVerify';

const loginMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.headers.authorization;
    console.log(token);

    if (!token) {
      throw new Error('No token provided');
    }

    loginVerify(token);
    next();
  } catch (error) {
    res
      .status(401)
      .json(error instanceof Error ? error.message : 'An error has occurred');
  }
};

export default loginMiddleware;
