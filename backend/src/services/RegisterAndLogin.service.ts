import { PrismaClient } from '@prisma/client';
// tipo para as models do prisma
import CustomError from '../helpers/CustomError';
// importa o erro customizado para ser usado no catch
import IregisterService from '../interfaces/IregisterAndLoginService.interface';
// importa a interface de register para ser usada no service
import { Ibycript, Ijwt } from '../interfaces/auth.interfaces';
// importa as interfaces de hash e jwt para serem usadas no service

export default class RegisterAndLoginService implements IregisterService {
  protected model: PrismaClient;
  private jwt: Ijwt;
  private bcrypt: Ibycript;
  constructor(model: PrismaClient, jwt: Ijwt, bcrypt: Ibycript) {
    this.model = model;
    // recebe um model que é o tipo PrismaClient
    this.jwt = jwt;
    // recebe uma classe que implementa a interface Ijwt
    this.bcrypt = bcrypt;
    // recebe uma classe de hash que implementa a interface Ibycript
  }

  // função para registrar um usuário
  async register(username: string, password: string): Promise<string> {
    const user = await this.model.users.findUnique({ where: { username } });
    // procura o usuário no banco
    if (user) throw new CustomError('Nome de usuário já existente', 400);
    // se encontrar o usuário, retorna um erro
    const accountCreate = await this.model.accounts.create({
      data: { balance: 100.00 },
    });
    // cria uma conta para o usuário com o saldo inicial de 100
    const encryptedPassword = await this.bcrypt.encryptPassword(password);
    // faz o hash da senha
    const response = await this.model.users.create({
      data: {
        username,
        password: encryptedPassword,
        accountid: accountCreate.id,
      },
    });
    // cria o usuário no banco
    if (response) return this.jwt.createToken(username);
    // se o usuário for criado, retorna um token
    throw new CustomError('Erro ao criar usuário', 500);
    // se não for criado, retorna um erro
  }

  // função para fazer login de um usuário
  async login(username: string, password: string): Promise<string> {
    const user = await this.model.users.findUnique({ where: { username } });
    // procura o usuário no banco
    if (!user) throw new CustomError('Usuário não encontrado', 404);
    // se não encontrar o usuário, retorna um erro
    const passwordVerify = await this.bcrypt.comparePassword(password, user.password);
    // compara a senha digitada com a senha do banco
    if (!passwordVerify) throw new CustomError('Senha incorreta', 401);
    // se a senha não for igual, retorna um erro
    return this.jwt.createToken(username);
    // se a senha for igual, retorna um token
  }

  // função para puxar um usuário pelo id
  async getUser(id: number): Promise<string> {
    const user = await this.model.users.findUnique({ where: { id } });
    // procura o usuário no banco
    if (!user) throw new CustomError('Usuário não encontrado', 404);
    // se não encontrar o usuário, retorna um erro
    return user.username;
    // se encontrar o usuário, retorna o username
  }
}
