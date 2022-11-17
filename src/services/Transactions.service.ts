/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import ITransactionsService from '../interfaces/ITransactions.interfaces';

export default class TransactionsService implements ITransactionsService {
  protected model: PrismaClient;
  private notFound = 'Usuário não encontrado';
  private date = new Date();
  private dia = String(this.date.getDate() - 1).padStart(2, '0');
  private mes = String(this.date.getMonth() + 1).padStart(2, '0');
  private ano = this.date.getFullYear();

  constructor(model: PrismaClient) {
    this.model = model;
  }

  transactionCreate = async (
    ownerUser: string,
    destinyUser: string,
    value: Decimal,
  ): Promise<void> => {
    const findOwnerUser = await this.model.users.findUnique({
      where: { username: ownerUser },
    });
    if (!findOwnerUser) throw new Error(this.notFound);
    const findDestinyUser = await this.model.users.findUnique({ where: { username: destinyUser } });
    if (!findDestinyUser) throw new Error(this.notFound);
    await this.model.transactions.create({
      data: {
        debitedAccountId: findOwnerUser.accountid,
        creditedAccountId: findDestinyUser.accountid,
        value: new Decimal(value),
        createdAt: `${this.dia}/${this.mes}/${this.ano}`,
      },
    });
  };

  transaction = async (ownerUser: string, destinyUser: string, value: number): Promise<void> => {
    const findUser = await this.model.users.findUnique({ where: { username: ownerUser } });
    if (!findUser) throw new Error(this.notFound);
    const findBalance = await this.model.accounts.findUnique({ where: { id: findUser.accountid } });
    if (!findBalance) throw new Error('Saldo não encontrado');
    if (value <= Number(findBalance.balance) !== true) throw new Error('Saldo insuficiente');
    if (ownerUser === destinyUser) throw new Error('Não é possível transferir para si mesmo');
    const findDestinyUser = await this.model.users.findUnique({ where: { username: destinyUser } });
    if (!findDestinyUser) throw new Error('Usuário de destino não encontrado');
    await this.model.accounts.update({
      where: { id: findDestinyUser.accountid },
      data: { balance: { increment: new Decimal(value) } },
    });
    await this.model.accounts.update({
      where: { id: findUser.accountid },
      data: { balance: { decrement: new Decimal(value) } },
    });
    await this.transactionCreate(ownerUser, destinyUser, new Decimal(value));
  };

  findAllTransactions = async (username: string): Promise<unknown> => {
    const findUser = await this.model.users.findUnique({ where: { username } });
    if (!findUser) throw new Error(this.notFound);
    const findTransactions = await this.model.transactions.findMany({
      where: {
        OR: [{ debitedAccountId: findUser.accountid }, { creditedAccountId: findUser.accountid }],
      },
    });
    if (!findTransactions) throw new Error('Transações não encontradas');
    return findTransactions;
  };

  findTransactionByQuery = async (username: string, query: string): Promise<unknown> => {
    const findUser = await this.model.users.findUnique({ where: { username } });
    if (!findUser) throw new Error(this.notFound);
    if (query === 'cash-in') {
      const findTransactions = await this.model.transactions.findMany({
        where: { creditedAccountId: findUser.accountid },
      });
      return findTransactions;
    }
    if (query === 'cash-out') {
      const findTransactions = await this.model.transactions.findMany({
        where: { debitedAccountId: findUser.accountid },
      });
      return findTransactions;
    }
    const findByDate = await this.model.transactions.findMany({
      where: { createdAt: query },
    });
    return findByDate;
  };
}
