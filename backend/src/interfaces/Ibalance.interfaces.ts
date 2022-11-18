import { Decimal } from '@prisma/client/runtime';
// funcionalidade do prisma para trabalhar com valores Decimais

export default interface IbalanceService {
  getBalance: (username: string) => Promise<Decimal>;
}
