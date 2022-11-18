import { NextFunction, Response } from 'express';
import IbalanceService from '../interfaces/Ibalance.interfaces';
import ICustomRequest from '../interfaces/ICustomRequest.interfaces';

export default class BalanceController {
  private balanceService: IbalanceService;

  constructor(balanceService: IbalanceService) {
    this.balanceService = balanceService;
    // recebe o um service como parâmetro que implementa a interface IbalanceService
  }

  // pega o saldo do usuário logado
  getBalance = async (
    req: ICustomRequest,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { username } = req;
      const balance = await this.balanceService.getBalance(username as string);
      return res.status(200).json({ balance });
    } catch (error) {
      next(error);
    }
  };
}
