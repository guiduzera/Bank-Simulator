import { Router } from 'express';
import JWT from '../helpers/jwt';
import prisma from '../client';
import RegisterController from '../controllers/Register.controllers';
import RegisterService from '../services/Register.service';
import Bcrypt from '../helpers/bcrypt';

const registerRouter = Router();

const model = prisma;

const jwt = new JWT();

const bcrypt = new Bcrypt();

const registerService = new RegisterService(model, jwt, bcrypt);

const controllers = new RegisterController(registerService);

registerRouter.post('/', controllers.register);

export default registerRouter;
