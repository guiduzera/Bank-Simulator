import { sign, verify } from 'jsonwebtoken';
import { Ijwt } from '../interfaces/auth.interfaces';
import CustomError from './CustomError';

export default class JWT implements Ijwt {
  private _secret = process.env.JWT_SECRET || 'secret';
  private _options: Record<string, string> = { expiresIn: '24h', algorithm: 'HS256' };

  public createToken(payload: string): string {
    const token = sign({ data: payload }, this._secret, this._options);
    return token;
  }

  public verifyToken(token: string): string {
    try {
      const { data } = verify(token, this._secret) as { data: string };
      return data;
    } catch (error) {
      throw new CustomError('Token inválido', 401);
    }
  }
}
