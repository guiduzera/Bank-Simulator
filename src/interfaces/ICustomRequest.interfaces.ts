import { Request } from 'express';

// interface para poder passar informações entre middlewares
export default interface ICustomRequest extends Request {
  username?: string;
}
