import * as sinon from 'sinon';
import chai from 'chai';
import { Response } from 'express';
import prisma from '../../database/client';
import BalanceServices from '../../services/Balance.service';
import BalanceController from '../../controllers/Balance.controllers';
import { Decimal } from '@prisma/client/runtime';
import ICustomRequest from '../../interfaces/ICustomRequest.interfaces';
const { expect } = chai;

const model = prisma;

const service = new BalanceServices(model);

const controllers = new BalanceController(service);

const req = {} as ICustomRequest;
const res = {} as Response;
const next = sinon.spy();

describe('Balance caso de sucesso', () => {
    before(() => {
        sinon.stub(service, 'getBalance').resolves(new Decimal(100));

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
    });

    after(() => {
        sinon.restore();
    });

    describe('getBalance efetuado com sucesso', () => {
        it('deve retornar um saldo', async () => {
            await controllers.getBalance(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith({ balance: new Decimal(100) })).to.be.true
        });
    });
});