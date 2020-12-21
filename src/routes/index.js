import { Router } from 'express';
import UserRoutes from './User';
import LoginRoutes from './Register';

const apiRoutes = Router();

apiRoutes.use('/user', UserRoutes);
apiRoutes.use(LoginRoutes);

export default apiRoutes;