import * as bcrypt from 'bcryptjs';
// modulo responsável por fazer o hash da senha
import { Ibycript } from '../interfaces/auth.interfaces';
// importa a interface Ibycript que garante um padrão de implementação para o hash

export default class Bcrypt implements Ibycript {
  // funcão responsável por fazer o hash da senha
  encryptPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  // função responsável por comparar a senha digitada com a senha do banco
  comparePassword = async (password:string, encrypted: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(password, encrypted);
    return isValid;
  };
}
