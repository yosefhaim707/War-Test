import { NextFunction, Request, Response } from 'express';
import adminVerify from '../utils/adminVerify';
import AuthRequest from '../types/AuthRequest';

const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token: string | undefined = req.headers.authorization;
    if (!token) {
      throw new Error('No token provided');
    }
    const isValid: boolean = adminVerify(token);
    isValid ? (req.isAdmin = true) : (req.isAdmin = false);
    next();
  } catch (error) {
    res
      .status(401)
      .json(error instanceof Error ? error.message : 'An error has occurred');
  }
};

export default authMiddleware;
