import { NextFunction, Request, Response } from 'express';
// tipos do express
import CustomError from '../helpers/CustomError';
// importa a minha classe de erro customizada

// middleware de erro chamado quando um erro é lançado no fluxo de execução
// chamdo pelo next(error)
// instanciado no arquivo src/app.ts
const errorMiddleware = (err: CustomError, req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({ error: message });
};

export default errorMiddleware;
