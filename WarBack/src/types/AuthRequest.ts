import { Request } from 'express';

interface AuthRequest extends Request {
  isAdmin?: boolean;
}

export default AuthRequest;
