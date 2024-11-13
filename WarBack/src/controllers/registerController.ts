import { Request, RequestHandler, Response } from 'express';
import { IUser } from '../models/User';
import registerService from '../services/userService/registerService';
import userDTO from '../DTO/userDTO';



const  registerController: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const userDTO: userDTO = req.body;
  try {
    if (!userDTO) {
      throw new Error('User data is required');
    }
    const user: IUser = await registerService(userDTO);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : 'Internal server error' });
  }
};

export default registerController;