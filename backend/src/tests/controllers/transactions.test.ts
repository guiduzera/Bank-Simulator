import { allTransactionsBankResponse,
     allTransactionsMiddlewareResponse,
     TransactionsByDateBankResponse,
     TransactionsByDateMiddlewareResponse,
     TransactionsByCashOutBankResponse,
     TransactionsByCashOutMiddlewareResponse,
     TransactionsByCashInBankResponse,
     TransactionsByCashInMiddlewareResponse
 } from './../mocks/transactionsMocks';
import * as sinon from 'sinon';
import chai from 'chai';
import { Response } from 'express';
import prisma from '../../database/client';
import TransactionsServices from '../../services/Transactions.service';
import TransactionsController from '../../controllers/Transaction.controllers';
import ICustomRequest from '../../interfaces/ICustomRequest.interfaces';
const { expect } = chai;

const model = prisma;

const service = new TransactionsServices(model);

const controllers = new TransactionsController(service);

const req = {} as ICustomRequest;
const res = {} as Response;
const next = sinon.spy();

describe('Transactions casos de sucesso', () => {
    before(() => {
        sinon.stub(service, 'findAllTransactions').resolves(allTransactionsBankResponse);
        sinon.stub(service, 'transaction').resolves(true);

        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
    });

    after(() => {
        sinon.restore();
    });

    describe('transactions efetuado com sucesso', () => {
        it('deve realizar uma transacao com sucesso', async () => {
            req.body = {
                destinyUser: "guiduzinho",
                value: 44.33
            };
            req.username = 'gago';
            await controllers.transaction(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith({
                message: 'Transação realizada com sucesso'
            })).to.be.true
        });
    });

    describe('findAllTransactions efetuado com sucesso', () => {
        it('deve retornar todas as transacoes do usuario', async () => {
            await controllers.findAllTransactions(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(allTransactionsMiddlewareResponse)).to.be.true;
        });
    });
});

describe('testanto filtros das transactions', () => {
    describe('testando filtro de data', () => {
        before(() => {
            sinon.stub(service, 'findTransactionByQuery').resolves(TransactionsByDateBankResponse);
    
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
        });
    
        after(() => {
            sinon.restore();
        });

        it('deve retornar as transacoes de uma data especifica', async () => {
            req.query = {
                date: '17/10/2021'
            };
            await controllers.findTransactionByQuery(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(TransactionsByDateMiddlewareResponse)).to.be.true;
        });
    });

    describe('testando filtro de cash-out', () => {
        before(() => {
            sinon.stub(service, 'findTransactionByQuery').resolves(TransactionsByCashOutBankResponse);
    
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
        });
    
        after(() => {
            sinon.restore();
        });

        it('deve retornar as transacoes de cash-out', async () => {
            req.query = {
                cashOut: 'true'
            };
            await controllers.findTransactionByQuery(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(TransactionsByCashOutMiddlewareResponse)).to.be.true;
        });
    });

    describe('testando filtro de cash-in', () => {
        before(() => {
            sinon.stub(service, 'findTransactionByQuery').resolves(TransactionsByCashInBankResponse);
    
            res.status = sinon.stub().returns(res);
            res.json = sinon.stub().returns(res);
        });
    
        after(() => {
            sinon.restore();
        });

        it('deve retornar as transacoes de cash-in', async () => {
            req.query = {
                cashIn: 'true'
            };
            await controllers.findTransactionByQuery(req, res, next);
            expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
            expect((res.json as sinon.SinonStub).calledWith(TransactionsByCashInMiddlewareResponse)).to.be.true;
        });
    });
});