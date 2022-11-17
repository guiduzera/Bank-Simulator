import { Router } from 'express';
import JWT from '../helpers/jwt';
import prisma from '../client';
import TokenVerify from '../middlewares/tokeVerify.middleware';
import TransactionControllers from '../controllers/Transaction.controllers';
import TransactionsService from '../services/Transactions.service';

const transactionRouter = Router();

const jwt = new JWT();

const model = prisma;

const jwtVerify = new TokenVerify(jwt);

const services = new TransactionsService(model);

const controllers = new TransactionControllers(services);

transactionRouter.patch('/transaction', jwtVerify.verify, controllers.transaction);

transactionRouter.get('/transaction/all', jwtVerify.verify, controllers.findAllTransactions);

transactionRouter.get('/transaction/search', jwtVerify.verify, controllers.findTransactionByQuery);

export default transactionRouter;
