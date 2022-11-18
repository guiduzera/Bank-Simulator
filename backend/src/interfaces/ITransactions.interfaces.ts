import { Decimal } from '@prisma/client/runtime';
// funcionalidade do prisma para trabalhar com valores Decimais

export default interface ITransactionsService {
  transaction: (ownerUser: string, destinyUser: string, value: number) => Promise<boolean>;
  transactionCreate: (ownerUser: string, destinyUser: string, value: Decimal) => Promise<boolean>;
  findAllTransactions: (username: string) => Promise<unknown>;
  findTransactionByQuery: (username: string, query: string) => Promise<unknown>;
}
