import jwt from 'jsonwebtoken';

export interface JWTPayload {
  username: string;
  isAdmin: boolean;
}

const tokenGenerator = (user: any): string => {
  const secretKey: string | undefined = process.env.SECRET_KEY;
  const payload: JWTPayload = {
    username: user.username,
    isAdmin: user.isAdmin,
  };
  if (!secretKey) {
    throw new Error('Secret key is missing');
  }
  const token: string = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
};

export default tokenGenerator;
