// middle criado para validar os dados de entrada do usuário no momento do cadastro
import { NextFunction, Request, Response } from 'express';
// tipos do express
import registerZodSchema from '../helpers/registerZodSchema';
// importa o zod para fazer a validação dos dados de entrada
import CustomError from '../helpers/CustomError';
// importa a classe de erro customizada

// middleware para validar os dados de entrada do usuário no momento do cadastro
// verificando se o username e a senha estão de acordo com o schema
// garantindo que o username tenha pelo menos 3 caracteres e a senha pelo menos 8 caracteres
// garantindo que a senha tenha pelo menos uma letra maiúscula e um número
const registerRules = (req: Request, _res: Response, next: NextFunction): void => {
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
