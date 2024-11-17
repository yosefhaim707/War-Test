import { Request, Response } from "express";
import organizationListService from "../services/userService/organizationListService";



const getAllOrganizations = async (req: Request, res: Response): Promise<void> => {
    try {
        const organizations: string[] = await organizationListService();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
    }
};

export default getAllOrganizations;
