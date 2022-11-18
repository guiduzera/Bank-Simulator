import { Request } from 'express';
// importa o Request do express

// interface para poder passar informações entre middlewares
export default interface ICustomRequest extends Request {
  username?: string;
}
