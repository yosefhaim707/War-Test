import { Request, Response } from 'express';
import { IAttack } from '../models/Attack';
import launchService from '../services/attackService/launchService';
import { wsManager } from '../app';

const launchController = async (req: Request, res: Response) => {
  try {
    const attack: IAttack | null = req.body;
    if (!attack || !attack.missile || !attack.target || !attack.source) {
      throw new Error('Missing required fields');
    }
    const newAttack: IAttack = await launchService(attack);
    if (!newAttack) {
      throw new Error('Failed to launch missile');
    }
    wsManager.broadcastAttack(newAttack);
    res.status(201).json(newAttack);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};

export default launchController;
