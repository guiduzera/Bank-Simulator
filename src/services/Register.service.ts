import { PrismaClient } from '@prisma/client';
import CustomError from '../helpers/CustomError';
import IregisterService from '../interfaces/IregisterService.interface';
import { Ibycript, Ijwt } from '../interfaces/auth.interfaces';

export default class RegisterService implements IregisterService {
  protected model: PrismaClient;
  private jwt: Ijwt;
  private bcrypt: Ibycript;
  constructor(model: PrismaClient, jwt: Ijwt, bcrypt: Ibycript) {
    this.model = model;
    this.jwt = jwt;
    this.bcrypt = bcrypt;
  }

  async register(username: string, password: string): Promise<string> {
    const user = await this.model.users.findUnique({ where: { username } });
    if (user) throw new CustomError('Nome de usuário já existente', 400);
    const accountCreate = await this.model.accounts.create({
      data: { balance: 100.00 },
    });
    const encryptedPassword = await this.bcrypt.encryptPassword(password);
    await this.model.users.create({
      data: {
        username,
        password: encryptedPassword,
        accountid: accountCreate.id,
      },
    });
    return this.jwt.createToken(username);
  }
}
