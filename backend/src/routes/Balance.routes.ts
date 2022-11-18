// aqui e o ponto mais alto da arquitetura, onde tudo se conecta
// as rotas são os pontos mais altos para todos os endpoints da aplicação
import { Router } from 'express';
import BalanceServices from '../services/Balance.service';
import BalanceController from '../controllers/Balance.controllers';
import JWT from '../helpers/jwt';
import TokenVerify from '../middlewares/tokeVerify.middleware';
import prisma from '../database/client';

const BalaceRouter = Router();

const jwt = new JWT();

const model = prisma;

const jwtVerify = new TokenVerify(jwt);

const services = new BalanceServices(model);

const controllers = new BalanceController(services);

BalaceRouter.get('/balance', jwtVerify.verify, controllers.getBalance);

export default BalaceRouter;
