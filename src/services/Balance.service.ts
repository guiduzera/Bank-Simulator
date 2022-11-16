import { Decimal } from '@prisma/client/runtime';
import { PrismaClient } from '@prisma/client';
import IbalanceService from '../interfaces/Ibalance.interfaces';

export default class BalanceServices implements IbalanceService {
  protected model: PrismaClient;
  constructor(model: PrismaClient) {
    this.model = model;
  }

  getBalance = async (username: string): Promise<Decimal> => {
    const findUser = await this.model.users.findUnique({ where: { username } });
    if (!findUser) throw new Error('Usuário não encontrado');
    const findBalance = await this.model.accounts.findUnique({
      where: { id: findUser.accountid },
    });
    if (!findBalance) throw new Error('Saldo não encontrado');
    return findBalance.balance;
  };
}
