import { Request, Response } from "express";
import targetService from "../services/attackService/targetService";
import { IOrganization } from "../models/Organization";



const getAllTargets = async (req: Request, res: Response) => {
    try {
        const targets: IOrganization[] = await targetService();
        res.status(200).json(targets);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
};

export default getAllTargets;
