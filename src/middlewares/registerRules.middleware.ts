// middle criado para validar os dados de entrada do usuário no momento do cadastro
import { NextFunction, Request, Response } from 'express';
import registerZodSchema from '../helpers/registerZodSchema';
import CustomError from '../helpers/CustomError';

const registerRules = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const numberVerify = password
      .split('').some((char: string) => {
        const number = parseInt(char, 10);
        return !Number.isNaN(number);
      });
    if (!numberVerify) throw new CustomError('A senha deve conter pelo menos um número', 400);
    const parsed = registerZodSchema.safeParse({ username, password });
    if (!parsed.success) {
      const { error } = parsed;
      const parseError = JSON.parse(error.message);
      throw new CustomError(parseError[0].message, 400);
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default registerRules;
