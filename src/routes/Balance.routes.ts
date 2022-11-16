import { Router } from 'express';
import BalanceServices from '../services/Balance.service';
import BalanceController from '../controllers/Balance.controllers';
import JWT from '../helpers/jwt';
import TokenVerify from '../middlewares/tokeVerify.middleware';
import prisma from '../client';

const BalaceRouter = Router();

const jwt = new JWT();

const model = prisma;

const jwtVerify = new TokenVerify(jwt);

const services = new BalanceServices(model);

const controllers = new BalanceController(services);

BalaceRouter.get('/balance', jwtVerify.verify, controllers.getBalance);

export default BalaceRouter;
