import { NextFunction, Request, Response } from 'express';
import IregisterService from '../interfaces/IregisterAndLoginService.interface';

export default class RegisterController {
  private service: IregisterService;
  constructor(service: IregisterService) {
    this.service = service;
    // recebe o um service como parâmetro que implementa a interface IregisterService
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    // faz o bind do this para que o this sempre seja a classe
    // se utilizar arrow function não precisa fazer o bind
  }

  // controller para cadastrar um usuário
  async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password } = req.body;
      const register = await this.service.register(username, password);
      return res.status(201).json({ token: register });
    } catch (error) {
      next(error);
    }
  }

  // controller para fazer login
  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password } = req.body;
      const login = await this.service.login(username, password);
      return res.status(200).json({ token: login });
    } catch (error) {
      next(error);
    }
  }
}
