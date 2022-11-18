// Mddleware criado para validar o token de acesso nos headers da requisição
import { NextFunction, Response } from 'express';
import ICustomRequest from '../interfaces/ICustomRequest.interfaces';
import CustomError from '../helpers/CustomError';
import { Ijwt } from '../interfaces/auth.interfaces';

// classe utilizada para validar o token de acesso
// gerando um middleware que será utilizado nas rotas que precisam de autenticação
// caso o token seja válido, o username sera passado para os middlewares
// caso o token seja inválido, uma mensagem de erro será enviada
class TokenVerify {
  constructor(private jwt: Ijwt) {}

  verify = (req: ICustomRequest, _res: Response, next: NextFunction): void => {
    const { authorization } = req.headers;
    if (!authorization) throw new CustomError('Token não encontrado', 401);
    try {
      const tokenVerification = this.jwt.verifyToken(authorization);
      req.username = tokenVerification;
      next();
    } catch (error) {
      next(error);
    }
  };
}

export default TokenVerify;
