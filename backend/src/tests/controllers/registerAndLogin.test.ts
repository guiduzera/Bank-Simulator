import * as sinon from 'sinon';
import chai from 'chai';
import { Request, Response } from 'express';
import prisma from '../../database/client';
import JWT from '../../helpers/jwt';
import Bcrypt from '../../helpers/bcrypt';
import RegisterAndLoginService from '../../services/RegisterAndLogin.service';
import RegisterAndLoginController from '../../controllers/RegisterAndLogin.controllers';
import { token } from '../mocks/registerAndLoginMocks';
const { expect } = chai;

const model = prisma;

const jwt = new JWT();

const bcrypt = new Bcrypt();

const registerService = new RegisterAndLoginService(model, jwt, bcrypt);

const controllers = new RegisterAndLoginController(registerService);

const req = {} as Request;
const res = {} as Response;
const next = sinon.spy();

describe('RegisterAndLoginController caso de sucesso', () => {

    before(() => {
        sinon.stub(registerService, 'login').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ2FnbyIsImlhdCI6MTY2ODcxMjU5NywiZXhwIjoxNjY4Nzk4OTk3fQ.l-flpHsW9Bzns18wjkY9kq64uxeN-4QmSP355l2IX-E');
        sinon.stub(registerService, 'register').resolves('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiZ2FnbyIsImlhdCI6MTY2ODcxMjU5NywiZXhwIjoxNjY4Nzk4OTk3fQ.l-flpHsW9Bzns18wjkY9kq64uxeN-4QmSP355l2IX-E');

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
    });

    after(() => {
        sinon.restore();
    });

    describe('register efetuado com sucesso', () => {
        it('deve retornar um token', async () => {
            req.body = {
                username: 'gago',
                password: '1460Suda'
            };
            await controllers.register(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(token)).to.be.true
        });
    });

    describe('login efetuado com sucesso', () => {
        it('deve retornar um token', async () => {
            req.body = {
                username: 'gago',
                password: '1460Suda'
            };
            await controllers.login(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(token)).to.be.true
        });
    });
});