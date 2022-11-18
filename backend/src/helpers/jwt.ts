import { sign, verify } from 'jsonwebtoken';
import { Ijwt } from '../interfaces/auth.interfaces';
// importa o modulo jwt que e responsavel por gerar o token e a interface Ijwt que garante um padrão de implementação para o token
import CustomError from './CustomError';
// importa a classe CustomError que e responsavel por gerar erros customizados

export default class JWT implements Ijwt {
  private _secret = process.env.JWT_SECRET || 'secret';
  // variável que guarda a palavra secreta para gerar o token que vem do arquivo .env, 'secret' caso não exista ou docker-compose.yml
  private _options: Record<string, string> = { expiresIn: '24h', algorithm: 'HS256' };
  // variavel que define o tempo de expiração do token

  // função responsável por gerar o token
  public createToken(payload: string): string {
    const token = sign({ data: payload }, this._secret, this._options);
    return token;
  }

  // função responsável por verificar se o token é valido
  public verifyToken(token: string): string {
    try {
      const { data } = verify(token, this._secret) as { data: string };
      return data;
    } catch (error) {
      throw new CustomError('Token inválido', 401);
    }
  }
}
