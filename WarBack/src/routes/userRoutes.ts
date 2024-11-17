import Router from 'express';
import registerController from '../controllers/registerController';
import loginController from '../controllers/loginController';
import getAllOrganizations from '../controllers/getAllOrganizations';


const router = Router();

router.get('/organizations', getAllOrganizations);
router.post('/register', registerController);
router.post('/login', loginController);


export default router;