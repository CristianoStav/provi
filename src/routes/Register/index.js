import { Router } from 'express';
import validateRequestInput from '../../middlewares/joi';
import RegisterController from '../../controllers/Register';
import { login } from '../../schemas';
import UserModel from '../../models/User';
import StepModel from '../../models/Step';

const routes = Router();
const loginController = new RegisterController({ UserModel, StepModel });

routes.post('/register', validateRequestInput(login), loginController.register.bind(loginController));

export default routes;