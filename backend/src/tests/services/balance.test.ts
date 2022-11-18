import * as sinon from 'sinon';
import chai from 'chai';
import { Response } from 'express';
import prisma from '../../database/client';
import BalanceServices from '../../services/Balance.service';
import { Decimal } from '@prisma/client/runtime';

const { expect } = chai;

const model = prisma;

const service = new BalanceServices(model);

describe('Balance caso de sucesso', () => {
    before(() => {
        sinon.stub(model.accounts, 'findUnique').resolves({ id: 1, balance: new Decimal(100) });
    });

    after(() => {
        sinon.restore();
    });

    describe('getBalance efetuado com sucesso', () => {
        it('deve retornar um saldo', async () => {
            const result = await service.getBalance('Kratos');
            expect(result).to.be.deep.equal(new Decimal(100));
        });
    });
});