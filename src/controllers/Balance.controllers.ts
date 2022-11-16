import { NextFunction, Response } from 'express';
import ICustomRequest from '../interfaces/ICustomRequest.interfaces';
import IbalanceService from '../interfaces/Ibalance.interfaces';

export default class BalanceController {
  private balanceService: IbalanceService;

  constructor(balanceService: IbalanceService) {
    this.balanceService = balanceService;
    this.getBalance = this.getBalance.bind(this);
  }

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
