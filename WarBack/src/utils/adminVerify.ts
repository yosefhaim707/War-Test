import jwt from 'jsonwebtoken';
import { JWTPayload } from './tokenGenerator';

const adminVerify = (token: string): boolean => {
  const secretKey = process.env.SECRET_KEY;
  const parsedToken = token.replace('Bearer ', '');
  if (!secretKey) {
    throw new Error('Secret key is missing');
  }
  const decodedToken = jwt.verify(parsedToken, secretKey) as JWTPayload;
  if (!decodedToken.isAdmin) {
    return false;
  }
  return true;
};

export default adminVerify;
