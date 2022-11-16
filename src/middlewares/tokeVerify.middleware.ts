// Mddleware criado para validar o token de acesso nos headers da requisição
import { NextFunction, Response } from 'express';
import ICustomRequest from '../interfaces/ICustomRequest.interfaces';
import CustomError from '../helpers/CustomError';
import { Ijwt } from '../interfaces/auth.interfaces';

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
