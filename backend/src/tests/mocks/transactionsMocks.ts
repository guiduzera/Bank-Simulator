// mocks pra teste das transações
import { Decimal } from '@prisma/client/runtime';
export const allTransactionsBankResponse =  [
    {
        id: 1,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: new Decimal(50),
        createdAt: "17/10/2021"
    },
    {
        id: 2,
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: new Decimal(50),
        createdAt: "16/11/2022"
    },
    {
        id: 3,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: new Decimal(100),
        createdAt: "17/11/2022"
    }
]

export const allTransactionsMiddlewareResponse = {
    transactions: allTransactionsBankResponse
}

export const TransactionsByDateBankResponse = [
    {
        id: 1,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: new Decimal(50),
        createdAt: "17/10/2021"
    },
]

export const TransactionsByDateMiddlewareResponse = {
    transactions: TransactionsByDateBankResponse
}

export const TransactionsByCashOutBankResponse = [
    {
        id: 1,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: new Decimal(50),
        createdAt: "17/10/2021"
    },
    {
        id: 3,
        debitedAccountId: 1,
        creditedAccountId: 2,
        value: new Decimal(100),
        createdAt: "17/11/2022"
    }
]

export const TransactionsByCashOutMiddlewareResponse = {
    transactions: TransactionsByCashOutBankResponse
}

export const TransactionsByCashInBankResponse = [
    {
        id: 2,
        debitedAccountId: 2,
        creditedAccountId: 1,
        value: new Decimal(50),
        createdAt: "16/11/2022"
    },
]

export const TransactionsByCashInMiddlewareResponse = {
    transactions: TransactionsByCashInBankResponse
}


export const transactionCreateBankMock = {
    id: 1,
    debitedAccountId: 1,
    creditedAccountId: 2,
    value: new Decimal(50),
    createdAt: "17/10/2021"
}
