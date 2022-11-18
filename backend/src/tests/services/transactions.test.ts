import { allTransactionsBankResponse,
    allTransactionsMiddlewareResponse,
    TransactionsByDateBankResponse,
    TransactionsByDateMiddlewareResponse,
    TransactionsByCashOutBankResponse,
    TransactionsByCashOutMiddlewareResponse,
    TransactionsByCashInBankResponse,
    TransactionsByCashInMiddlewareResponse,
    transactionCreateBankMock,
} from './../mocks/transactionsMocks';
import * as sinon from 'sinon';
import chai from 'chai';
import { Response } from 'express';
import prisma from '../../database/client';
import TransactionsServices from '../../services/Transactions.service';

const { expect } = chai;

const model = prisma;

const service = new TransactionsServices(model);

describe('Transactions casos de sucesso', () => {
    before(() => {
        sinon.stub(model.transactions, 'create').resolves(transactionCreateBankMock);
        sinon.stub(service, 'transaction').resolves(true);
        sinon.stub(model.transactions, 'findMany').resolves(allTransactionsBankResponse);
        sinon.stub(service, 'findAllTransactions').resolves(allTransactionsMiddlewareResponse);
    });

    after(() => {
        sinon.restore();
    });

    describe('transaction efetuado com sucesso', () => {
        it('deve realizar uma transacao com sucesso', async () => {
            const result = await service.transaction('gago', 'guiduzinho', 44.33);
            expect(result).to.be.deep.equal(true);
        });
    });

    describe('findAllTransactions efetuado com sucesso', () => {
        it('deve retornar todas as transacoes do usuario', async () => {
            const result = await service.findAllTransactions('gago');
            expect(result).to.be.deep.equal(allTransactionsMiddlewareResponse);
        });
    });
});

describe('testando os filtros de transacoes', () => {
    describe('findByDate efetuado com sucesso', () => {
        before(() => {
            sinon.stub(model.transactions, 'findMany').resolves(TransactionsByDateBankResponse);
            sinon.stub(service, 'findTransactionByQuery').resolves(TransactionsByDateBankResponse);
        });
    
        after(() => {
            sinon.restore();
        });
        it('deve retornar todas as transacoes do usuario filtradas por data', async () => {
            const result = await service.findTransactionByQuery('gago', '17/10/2021');
            expect(result).to.be.deep.equal(TransactionsByDateBankResponse);
        });
    });

    describe('findByCashOut efetuado com sucesso', () => {
        before(() => {
            sinon.stub(model.transactions, 'findMany').resolves(TransactionsByCashOutBankResponse);
            sinon.stub(service, 'findTransactionByQuery').resolves(TransactionsByCashOutBankResponse);
        });
    
        after(() => {
            sinon.restore();
        });
        it('deve retornar todas as transacoes filtradas por cash-out do usuario', async () => {
            const result = await service.findTransactionByQuery('gago', 'cash-out');
            expect(result).to.be.deep.equal(TransactionsByCashOutBankResponse);
        });
    });

    describe('findByCashIn efetuado com sucesso', () => {
        before(() => {
            sinon.stub(model.transactions, 'findMany').resolves(TransactionsByCashInBankResponse);
            sinon.stub(service, 'findTransactionByQuery').resolves(TransactionsByCashInBankResponse);
        });
    
        after(() => {
            sinon.restore();
        });
        it('deve retornar todas as transacoes filtradas por cash-in do usuario', async () => {
            const result = await service.findTransactionByQuery('gago', 'cash-in');
            expect(result).to.be.deep.equal(TransactionsByCashInBankResponse);
        });
    });
});