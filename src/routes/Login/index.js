import { Router } from 'express';
import validateRequestInput from '../../middlewares/joi';
import LoginController from '../../controllers/Login';
import { login } from '../../schemas';
import UserModel from '../../models/User';
import StepModel from '../../models/Step';

const routes = Router();
const loginController = new LoginController({ UserModel, StepModel });

routes.post('/login', loginController.login.bind(loginController));
routes.post('/register', validateRequestInput(login), loginController.register.bind(loginController));

export default routes;