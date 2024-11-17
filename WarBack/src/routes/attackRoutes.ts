import { Router } from 'express';
import getAllTargets from '../controllers/getAllTargets';

const attackRoutes = Router();

attackRoutes.get('/targets', getAllTargets);

export default attackRoutes;
