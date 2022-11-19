/* eslint-disable @typescript-eslint/naming-convention */
// tive que desabilitar essa regra pois o eslint so aceita nomes de variáveis em camelCase
// e o prisma usa um parametro chamdo OR que nao pode ser alterado
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import ITransactionsService from '../interfaces/ITransactions.interfaces';
// importa a interface de transações

export default class TransactionsService implements ITransactionsService {
  protected model: PrismaClient;
  // variável para armazenar a model que implementa o PrismaClient
  private notFound = 'Usuário não encontrado';
  // frase padrão para quando não encontrar o usuário
  /// --------- /////
  // forma que eu encontrei para fazer a normalização da data
  private date = new Date();
  private dia = String(this.date.getDate()).padStart(2, '0');
  private mes = String(this.date.getMonth() + 1).padStart(2, '0');
  private ano = this.date.getFullYear();
  /// --------- /////

  constructor(model: PrismaClient) {
    this.model = model;
  }

  // funcão que e chamada na this.transaction para criar uma transação de acordo com a transferência
  transactionCreate = async (
    ownerUser: string,
    destinyUser: string,
    value: Decimal,
  ): Promise<boolean> => {
    const findOwnerUser = await this.model.users.findUnique({ where: { username: ownerUser } });
    // procura o usuário que vai fazer a transferência
    if (!findOwnerUser) throw new Error(this.notFound);
    // se não encontrar o usuário, retorna um erro
    const findDestinyUser = await this.model.users.findUnique({ where: { username: destinyUser } });
    // procura o usuário que vai receber a transferência
    if (!findDestinyUser) throw new Error(this.notFound);
    // se não encontrar o usuário, retorna um erro
    await this.model.transactions.create({
      data: {
        debitedAccountId: findOwnerUser.accountid,
        creditedAccountId: findDestinyUser.accountid,
        value: new Decimal(value),
        createdAt: `${this.dia}/${this.mes}/${this.ano}`,
      },
    });
    // cria a transação na data correta
    return true;
    // retorna true para a this.transaction
  };

  // função que executa a transação em si entre os usuários atualizando o saldo de ambos
  transaction = async (ownerUser: string, destinyUser: string, value: number): Promise<boolean> => {
    const findUser = await this.model.users.findUnique({ where: { username: ownerUser } });
    // procura o usuário no banco
    if (!findUser) throw new Error(this.notFound);
    // se não encontrar o usuário, retorna um erro
    const findBalance = await this.model.accounts.findUnique({ where: { id: findUser.accountid } });
    // procura a conta do usuário no banco
    if (!findBalance) throw new Error('Saldo não encontrado');
    // se não encontrar o saldo, retorna um erro
    if (value <= Number(findBalance.balance) !== true) throw new Error('Saldo insuficiente');
    // se o valor da transferência for maior que o saldo, retorna um erro
    if (ownerUser === destinyUser) throw new Error('Não é possível transferir para si mesmo');
    // se o usuário que está transferindo for o mesmo que está recebendo, retorna um erro
    const findDestinyUser = await this.model.users.findUnique({ where: { username: destinyUser } });
    // procura o usuário de destino no banco
    if (!findDestinyUser) throw new Error('Usuário de destino não encontrado');
    // se não encontrar o usuário de destino, retorna um erro
    await this.model.accounts.update({
      where: { id: findDestinyUser.accountid },
      data: { balance: { increment: new Decimal(value) } },
    });
    // atualiza o saldo do usuário de destino
    await this.model.accounts.update({
      where: { id: findUser.accountid },
      data: { balance: { decrement: new Decimal(value) } },
    });
    // atualiza o saldo do usuário que está transferindo
    const addTransaction = await this.transactionCreate(ownerUser, destinyUser, new Decimal(value));
    // chama a função transactionCreate para criar a transação
    return addTransaction;
    // retorna true se tudo der certo
  };

  // função para trazer todas as transações de um usuário
  findAllTransactions = async (username: string): Promise<unknown> => {
    const findUser = await this.model.users.findUnique({ where: { username } });
    // procura o usuário no banco
    if (!findUser) throw new Error(this.notFound);
    // se não encontrar o usuário, retorna um erro
    const findTransactions = await this.model.transactions.findMany({
      where: {
        OR: [{ debitedAccountId: findUser.accountid }, { creditedAccountId: findUser.accountid }],
      },
    });
    // procura todas as transações do usuário
    if (!findTransactions) throw new Error('Transações não encontradas');
    // se não encontrar nenhuma transação, retorna um erro
    return findTransactions;
    // retorna as transações
  };

  // função que filtra as transações de acordo com a data, cash-out ou cash-in do usuário
  findTransactionByQuery = async (username: string, query: string, complement: string): Promise<unknown> => {
    const findUser = await this.model.users.findUnique({ where: { username } });
    // procura o usuário no banco
    if (!findUser) throw new Error(this.notFound);
    // se não encontrar o usuário, retorna um erro
    if (query === 'cash-in') {
      const findTransactions = await this.model.transactions.findMany({
        where: { creditedAccountId: findUser.accountid },
      });
      return findTransactions;
    }
    // se a query for cash-in, retorna todas as transações que o usuário recebeu
    if (query === 'cash-out') {
      const findTransactions = await this.model.transactions.findMany({
        where: { debitedAccountId: findUser.accountid },
      });
      return findTransactions;
    }
    // se a query for de data e cash-in
    if (query !== 'cash-in' && query !== 'cash-out' && complement === 'cash-in') {
      const result = await this.model.transactions.findMany({
        where: {
          AND: [{ createdAt: query }, { creditedAccountId: findUser.accountid }],
        },
      });
      return result
    }
    // se a query for de data e cash-out
    if (query !== 'cash-in' && query !== 'cash-out' && complement === 'cash-out') {
      const result = await this.model.transactions.findMany({
        where: {
          AND: [{ createdAt: query }, { debitedAccountId: findUser.accountid }],
        },
      });
      return result
    }
    // se a query for cash-out, retorna todas as transações que o usuário fez
    const findByDate = await this.model.transactions.findMany({
      where: {
        AND: [{ createdAt: query }, { OR: [{ debitedAccountId: findUser.accountid }, { creditedAccountId: findUser.accountid }] }],
      }
    });
    // se a query for uma data, retorna todas as transações feitas naquela data
    return findByDate;
    // retorna as transações
  };
}
