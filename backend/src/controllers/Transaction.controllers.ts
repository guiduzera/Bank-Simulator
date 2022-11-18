import { NextFunction, Response } from 'express';
import ITransactionsService from '../interfaces/ITransactions.interfaces';
import ICustomRequest from '../interfaces/ICustomRequest.interfaces';

export default class TransactionControllers {
  private transactionService: ITransactionsService;

  constructor(transactionService: ITransactionsService) {
    this.transactionService = transactionService;
    // recebe o um service como parâmetro que implementa a interface ITransactionsService
  }

  // controller responsável por fazer uma transação entre usuários
  transaction = async (
    req: ICustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username } = req;
      const { destinyUser, value } = req.body;
      const transaction = await this.transactionService.transaction(
        username as string,
        destinyUser,
        value,
      );
      if (transaction) return res.status(200).json({ message: 'Transação realizada com sucesso' });
      return res.status(400).json({ message: 'Transação não realizada' });
    } catch (error) {
      next(error);
    }
  };

  // controller responsável por pegar as todas transações do usuário logado
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

  // controller responsável por pegar as transações do usuário logado por data, cashIn ou cashOut
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
