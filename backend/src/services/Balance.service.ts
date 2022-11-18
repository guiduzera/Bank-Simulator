import { Decimal } from '@prisma/client/runtime';
// funcionalidade do prisma para trabalhar com valores Decimais
import { PrismaClient } from '@prisma/client';
// tipo da model para o prisma
import IbalanceService from '../interfaces/Ibalance.interfaces';
// importa a interface de balance para ser usada no service

export default class BalanceServices implements IbalanceService {
  protected model: PrismaClient;
  constructor(model: PrismaClient) {
    this.model = model;
    // recebe o model do prisma
    // presente no arquivo src/database/client.ts
  }

  // função para pegar o saldo do usuário
  getBalance = async (username: string): Promise<Decimal> => {
    const findUser = await this.model.users.findUnique({ where: { username } });
    // procura o usuário no banco
    if (!findUser) throw new Error('Usuário não encontrado');
    // se não encontrar o usuário, retorna um erro
    const findBalance = await this.model.accounts.findUnique({
      where: { id: findUser.accountid },
    });
    // procura a conta do usuário no banco
    if (!findBalance) throw new Error('Saldo não encontrado');
    // se não encontrar o saldo, retorna um erro
    return findBalance.balance;
    // retorna o saldo do usuário
  };
}
