import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';
import { IOrganization } from '../models/Organization';

export interface JWTPayload {
  username: string;
  organizationName: string;
}

const tokenGenerator = (user: IUser): string => {
  const secretKey: string | undefined = process.env.SECRET_KEY;
  const payload: JWTPayload = {
    username: user.name,
    organizationName: (user.organization as IOrganization).name
  };
  if (!secretKey) {
    throw new Error('Secret key is missing');
  }
  const token: string = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};

export default tokenGenerator;
