import { NextFunction, Request, Response } from 'express';
import IregisterService from '../interfaces/IregisterService.interface';

export default class RegisterController {
  service: IregisterService;
  constructor(service: IregisterService) {
    this.service = service;
    this.register = this.register.bind(this);
  }

  async register(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username, password } = req.body;
      const register = await this.service.register(username, password);
      return res.status(201).json(register);
    } catch (error) {
      next(error);
    }
  }
}
