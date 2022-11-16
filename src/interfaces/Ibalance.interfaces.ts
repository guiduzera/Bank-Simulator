import { Decimal } from '@prisma/client/runtime';

export default interface IbalanceService {
  getBalance: (username: string) => Promise<Decimal>;
}
