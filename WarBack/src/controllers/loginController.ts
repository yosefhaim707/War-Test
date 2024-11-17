import { RequestHandler, Request, Response } from 'express';
import loginDTO from '../DTO/loginDTO';
import loginService, { LoginResponse } from '../services/userService/loginService';


const loginController: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const loginDTO: loginDTO = req.body;
    if (!loginDTO.name || !loginDTO.password) {
      throw new Error('Data is missing');
    }
    const response: LoginResponse = await loginService(loginDTO);
    res.status(200).json({ response });
  } catch (error) {
    res
      .status(400)
      .json({
        message:
          error instanceof Error ? error.message : 'Internal server error',
      });
  }
};

export default loginController;
