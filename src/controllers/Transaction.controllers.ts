import { NextFunction, Response } from 'express';
import ITransactionsService from '../interfaces/ITransactions.interfaces';
import ICustomRequest from '../interfaces/ICustomRequest.interfaces';

export default class TransactionControllers {
  private transactionService: ITransactionsService;

  constructor(transactionService: ITransactionsService) {
    this.transactionService = transactionService;
  }

  transaction = async (
    req: ICustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username } = req;
      const { destinyUser, value } = req.body;
      await this.transactionService.transaction(
        username as string,
        destinyUser,
        value,
      );
      return res.status(201).json({ message: 'Transação realizada com sucesso' });
    } catch (error) {
      next(error);
    }
  };

  findAllTransactions = async (
    req: ICustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username } = req;
      const transactions = await this.transactionService.findAllTransactions(
        username as string,
      );
      return res.status(200).json({ transactions });
    } catch (error) {
      next(error);
    }
  };

  findTransactionByQuery = async (
    req: ICustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username } = req;
      const { query } = req.query;
      const transactions = await this.transactionService.findTransactionByQuery(
        username as string,
        query as string,
      );
      return res.status(200).json({ transactions });
    } catch (error) {
      next(error);
    }
  };
}
