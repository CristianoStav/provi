import { Router } from 'express';
import cpfValidator from 'cpf';
import validateRequestInput from '../../middlewares/joi';
import verifyToken from '../../middlewares/jwt';
import verifyStep from '../../middlewares/step';
import validateCep from '../../services/cep';

import * as UserRepository from '../../repository/User';
import * as StepRepository from '../../repository/Step';
import UserController from '../../controllers/User';
import { full_name, cpf, phone, birthday, address, request_amount } from '../../schemas';

const routes = Router();
const userController = new UserController({ UserRepository, StepRepository, cpfValidator, cepService: validateCep });

routes.use('*', verifyToken);

routes.get('/', userController.show.bind(userController));

routes.patch('/cpf',
  [validateRequestInput(cpf), verifyStep],
  userController.updateCPF.bind(userController)
);

routes.patch('/full-name',
  [validateRequestInput(full_name), verifyStep],
  userController.updateName.bind(userController)
);

routes.patch('/birthday',
  [validateRequestInput(birthday), verifyStep],
  userController.updateBirthday.bind(userController)
);

routes.patch('/phone',
  [validateRequestInput(phone), verifyStep],
  userController.updatePhone.bind(userController)
);

routes.patch('/address',
  [validateRequestInput(address), verifyStep],
  userController.updateAddress.bind(userController)
);

routes.post('/request_amount',
  [validateRequestInput(request_amount), verifyStep],
  userController.requestAmount.bind(userController)
);

export default routes;