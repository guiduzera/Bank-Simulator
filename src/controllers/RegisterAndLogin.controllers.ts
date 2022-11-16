import { NextFunction, Request, Response } from 'express';
import IregisterService from '../interfaces/IregisterAndLoginService.interface';

export default class RegisterController {
  service: IregisterService;
  constructor(service: IregisterService) {
    this.service = service;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password } = req.body;
      const register = await this.service.register(username, password);
      return res.status(201).json({ token: register });
    } catch (error) {
      next(error);
    }
  }

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
