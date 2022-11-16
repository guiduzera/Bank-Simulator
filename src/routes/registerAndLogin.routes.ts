import { Router } from 'express';
import JWT from '../helpers/jwt';
import prisma from '../client';
import RegisterAndLoginController from '../controllers/RegisterAndLogin.controllers';
import RegisterAndLoginService from '../services/RegisterAndLogin.service';
import Bcrypt from '../helpers/bcrypt';
import registerRules from '../middlewares/registerRules.middleware';

const registerAndLoginRouter = Router();

const model = prisma;

const jwt = new JWT();

const bcrypt = new Bcrypt();

const registerService = new RegisterAndLoginService(model, jwt, bcrypt);

const controllers = new RegisterAndLoginController(registerService);

registerAndLoginRouter.post('/register', registerRules, controllers.register);

registerAndLoginRouter.post('/login', controllers.login);

export default registerAndLoginRouter;
