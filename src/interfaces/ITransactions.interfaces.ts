import { Decimal } from '@prisma/client/runtime';

export default interface ITransactionsService {
  transaction: (ownerUser: string, destinyUser: string, value: number) => Promise<void>;
  transactionCreate: (ownerUser: string, destinyUser: string, value: Decimal) => Promise<void>;
  findAllTransactions: (username: string) => Promise<unknown>;
  findTransactionByQuery: (username: string, query: string) => Promise<unknown>;
}

// arrumar os unknowns o decimal
