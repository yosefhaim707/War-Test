import jwt from 'jsonwebtoken';
import { JWTPayload } from './tokenGenerator';


const loginVerify = (token: string): boolean => {
  const secretKey = process.env.SECRET_KEY;
  const parsedToken = token.replace('Bearer ', '');
  console.log(parsedToken);

  if (!secretKey) {
    throw new Error('Secret key is missing');
  }
  jwt.verify(parsedToken, secretKey) as JWTPayload;
  return true;
};

export default loginVerify;
